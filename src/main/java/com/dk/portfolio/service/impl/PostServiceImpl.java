package com.dk.portfolio.service.impl;

import com.dk.portfolio.exception.CustomExceptionResponse;
import com.dk.portfolio.model.*;
import com.dk.portfolio.repository.PostRepository;
import com.dk.portfolio.service.PostService;
import com.dk.portfolio.utility.ServiceUtility;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final ServiceUtility serviceUtility;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, ServiceUtility serviceUtility) {
        this.postRepository = postRepository;
        this.serviceUtility = serviceUtility;
    }

    @Override
    public List<Post> getAllPosts() {
        List<Post> all = (List<Post>) postRepository.findAll();
        convertPostsDateIntoHumanReadable(all);
        if (all.isEmpty()) {
            throw new CustomExceptionResponse("Add Post");
        }
        return all;
    }



    @Override
    public Page<Post> getPostsByPage(int page, String keyword, String order) {
        Sort.Direction direction = order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        int PAGE_SIZE = 6;
        Pageable pageable = PageRequest.of(page, PAGE_SIZE, Sort.by(direction, "id"));
        Page<Post> postPage = postRepository.findAll(pageable);
        if (!keyword.equals("")) {
            postPage = postRepository.findAll(keyword, pageable);
        }
        if (postPage.isEmpty()) {
            throw new CustomExceptionResponse("Add Post");
        }
        convertPostsDateIntoHumanReadable(postPage.get().collect(Collectors.toList()));
        return postPage;
    }

    @Override
    public List<Post> getAllFeaturedPosts() {
        List<Post> all = postRepository.findAllByFeaturedOrderByCreatedAtDesc(true);

        if (all.isEmpty()) {
            throw new CustomExceptionResponse("No featured post");
        }
        convertPostsDateIntoHumanReadable(all);
        return all;
    }

    @Override
    public HashMap<String, Post> getSinglePost(Long id) {
        Post current = postRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );

        String monthName = current.getCreatedAt().getMonth().toString();
        current.setHumanReadableDate(
                monthName.charAt(0) + monthName.substring(1).toLowerCase() + " " +
                        current.getCreatedAt().getDayOfMonth() + ", " +
                        current.getCreatedAt().getYear());


        Post prev = postRepository.findPrevPost(id).orElse(null);
        Post next = postRepository.findNextPost(id).orElse(null);

        HashMap<String, Post> posts = new HashMap<>();
        posts.put("current", current);
        posts.put("prev", prev);
        posts.put("next", next);
        return posts;
    }

    @Override
    public Post createPost(Post post) {
        Optional<Post> postExist = postRepository.findBySlug(post.getSlug());

        if (postExist.isPresent()) {
            throw new CustomExceptionResponse("Post have same slug");
        }
        return postRepository.save(post);
    }


    @Override
    public Post updatePost(Post post, Long id) {
        Post tmp = postRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        tmp.setTitle(post.getTitle());
        tmp.setSubTitle(post.getSubTitle());
        tmp.setDescription(post.getDescription());
        tmp.setFeatured(post.isFeatured());
        if (post.getSlug() != null) {
            tmp.setSlug(post.getSlug());
        }
        if (post.getTags() != null) {
            Set<Tag> tagSet = serviceUtility.getAllTagsAssociateWithEntity(post.getTags());
            tmp.setTags(tagSet);
        }
        if (post.getCategories() != null) {
            Set<Category> categorySet = serviceUtility.getAllCategoriesAssociateWithEntity(post.getCategories());
            tmp.setCategories(categorySet);
        }
        if (post.getPictures() != null) {
            Set<Picture> pictureSet = serviceUtility.getAllPictureAssociateWithEntity(post.getPictures());
            tmp.setPictures(pictureSet);
        }
        return postRepository.save(tmp);
    }

    @Override
    public String deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> {
            throw new CustomExceptionResponse("Post doesn't exists");
        });

        Set<Picture> pictures = post.getPictures();
        boolean isDeleted = false;

        if (pictures.isEmpty()) {
            isDeleted = true;
        }
        else {
            for (Picture picture : pictures) {
                File file = new File(System.getProperty("user.dir") + picture.getLocation());
                if (file.exists()) {
                    isDeleted = file.delete();
                    if (!isDeleted) {
                        throw new CustomExceptionResponse("Failed to delete some image");
                    }
                }
            }
        }

        if (isDeleted) {
            File dir = new File(System.getProperty("user.dir") + "/public/post/" + post.getSlug());
            try {
                FileUtils.deleteDirectory(dir);
                postRepository.deleteById(id);
            } catch (IOException e) {
                throw new CustomExceptionResponse("Failed to delete project");
            }
        }
        return post.getTitle();
    }

    @Override
    public void updatePostByPicture(Picture picture) {
        Post post = postRepository.findByPictures(picture).orElse(null);
        if (post != null) {
            Set<Picture> pictures = post.getPictures();
            pictures.remove(picture);
            post.setPictures(pictures);
            postRepository.save(post);
        }
    }



    public void convertPostsDateIntoHumanReadable(List<Post> posts) {
        posts.forEach(post -> {
            String monthName = post.getCreatedAt().getMonth().toString();
            post.setHumanReadableDate(
                    monthName.charAt(0) + monthName.substring(1).toLowerCase() + " " +
                            post.getCreatedAt().getDayOfMonth() + ", " +
                            post.getCreatedAt().getYear());
        });
    }
}

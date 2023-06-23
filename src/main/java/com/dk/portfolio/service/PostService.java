package com.dk.portfolio.service;

import com.dk.portfolio.model.Picture;
import com.dk.portfolio.model.Post;
import org.springframework.data.domain.Page;

import java.util.HashMap;
import java.util.List;

public interface PostService {
    List<Post> getAllPosts();
    Page<Post> getPostsByPage(int page, String keyword, String order);
    List<Post> getAllFeaturedPosts();
    Post createPost(Post post);
    HashMap<String, Post> getSinglePost(Long id);
    Post updatePost(Post post, Long id);
    String deletePost(Long id);
    void updatePostByPicture(Picture picture);
}

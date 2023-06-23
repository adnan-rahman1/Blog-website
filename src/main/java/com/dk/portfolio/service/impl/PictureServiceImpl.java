package com.dk.portfolio.service.impl;

import com.dk.portfolio.exception.CustomExceptionResponse;
import com.dk.portfolio.model.Category;
import com.dk.portfolio.model.Picture;
import com.dk.portfolio.model.Post;
import com.dk.portfolio.model.Project;
import com.dk.portfolio.repository.PictureRepository;
import com.dk.portfolio.service.*;
import com.dk.portfolio.utility.ServiceUtility;
import org.apache.commons.io.FileUtils;
import org.aspectj.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
public class PictureServiceImpl implements PictureService {

    private final PictureRepository pictureRepository;
    private final UserService userService;
    private final ProjectService projectService;
    private final PostService postService;
    protected FileSystemService fileSystemService;

    @Autowired
    public PictureServiceImpl(
            PictureRepository pictureRepository,
            FileSystemService fileSystemService,
            UserService userService,
            ProjectService projectService,
            PostService postService
    ) {
        this.pictureRepository = pictureRepository;
        this.fileSystemService = fileSystemService;
        this.userService = userService;
        this.projectService = projectService;
        this.postService = postService;
    }

    @Override
    public List<Picture> getAllPicture() {
        List<Picture> all = pictureRepository.findAll();
        if (all.isEmpty()) {
            throw new CustomExceptionResponse("No Pictures");
        }
        return all;
    }

    @Override
    public FileSystemResource getSinglePicture(Long id) {
        Picture picture = pictureRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return fileSystemService.findInFileSystem(picture.getLocation());
    }

    @Override
    public Picture storeImage(MultipartFile file, String section, String directory, String imageName) {
        if (file.isEmpty()) return null;

        if (section.equals("profile")) {
            Picture pic = pictureRepository.findBySection(section);
            if (pic != null) {
                deletePicture(pic.getId());
            }
        }
        String newImageName = fileSystemService.getNewNameForImageFile(imageName);
        String location = fileSystemService.setupFileLocation(file, directory, newImageName);
        if (location != null) {
            Picture picture = new Picture();
            picture.setName(newImageName);
            picture.setLocation(location);
            picture.setSection(section);
            return pictureRepository.save(picture);
        }
        return null;
    }


    @Override
    public String deletePicture(Long id) {
        Picture picture = pictureRepository.findById(id).orElseThrow(() -> {
            throw new CustomExceptionResponse("Picture doesn't exist");
        });

        boolean isDeleted = false;
        String path = System.getProperty("user.dir") + picture.getLocation() + "/" + picture.getName();
        File file = new File(path);
        if (file.exists()) {
            isDeleted = file.delete();
        }

        if (!isDeleted) {
            throw new CustomExceptionResponse("Failed to delete image");
        }

        switch (picture.getSection()) {
            case "profile":
                userService.updateUserByAvatar(picture);
                break;
            case "project":
                projectService.updateProjectByPicture(picture);
                break;
            case "post":
            case "cover":
                postService.updatePostByPicture(picture);
                break;
        }

        pictureRepository.delete(picture);
        return picture.getName();
    }

    @Override
    public boolean deleteAllPicture() {
        try {
            pictureRepository.deleteAll();
        } catch (NullPointerException e) {
            return false;
        }
        return true;
    }
}

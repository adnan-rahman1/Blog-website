package com.dk.portfolio.service;

import com.dk.portfolio.model.Picture;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

public interface PictureService {
    List<Picture> getAllPicture();
    FileSystemResource getSinglePicture(Long id);
    Picture storeImage(MultipartFile bytes, String section, String directory, String imageName);
    String deletePicture(Long id);
    boolean deleteAllPicture();
}

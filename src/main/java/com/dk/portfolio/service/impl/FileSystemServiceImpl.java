package com.dk.portfolio.service.impl;

import com.dk.portfolio.model.Picture;
import com.dk.portfolio.repository.PictureRepository;
import com.dk.portfolio.service.FileSystemService;
import com.dk.portfolio.service.PictureService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@Service
public class FileSystemServiceImpl implements FileSystemService {

    String newImageName = "";
    String RESOURCE_DIR = System.getProperty("user.dir") + "/public/";
    String DB_IMAGE_DIR = "/public/";// Problem occurs here

    @Autowired
    public FileSystemServiceImpl() { }

    @Override
    public Path generatePath(byte[] bytes, String directory, String newImageName) {
        return Paths.get(RESOURCE_DIR + directory, newImageName);
    }

    @Override
    public String setupFileLocation(MultipartFile file, String directory, String newImageName) {
        try {
            // get path and generate new image name
            Path path = generatePath(file.getBytes(), directory, newImageName);
            /* Store file in file system */
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            /* ************************* */
            return Paths.get(DB_IMAGE_DIR, directory).toAbsolutePath().toString(); // This is for storing path in the database
        } catch (IOException e) {
            return null;
        }
    }

    @Override
    public FileSystemResource findInFileSystem(String location) {
        try {
            return new FileSystemResource(Paths.get(location));
        } catch (ResponseStatusException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public String getNewNameForImageFile(String imgFile) {
        newImageName = new Date().getTime() + "_" + imgFile;
        return newImageName;
    }
}

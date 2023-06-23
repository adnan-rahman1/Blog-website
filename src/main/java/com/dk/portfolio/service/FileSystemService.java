package com.dk.portfolio.service;

import org.springframework.core.io.FileSystemResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;

public interface FileSystemService {
    String getNewNameForImageFile(String imageName);
    Path generatePath(byte[] bytes, String fileSection, String imageName);
    String setupFileLocation(MultipartFile file, String fileSection, String imageName);
    FileSystemResource findInFileSystem(String location);
}

package com.dk.portfolio.controller;

import com.dk.portfolio.model.Picture;
import com.dk.portfolio.service.PictureService;
import com.dk.portfolio.utility.ResponseUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/picture")
//@CrossOrigin(origins = "*")
public class PictureController {

    private final PictureService pictureService;

    @Autowired
    public PictureController(PictureService pictureService) {
        this.pictureService = pictureService;
    }

    @GetMapping
    public List<Picture> getAllPicture() {
        return pictureService.getAllPicture();
    }

    @GetMapping(value = "/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    private FileSystemResource getSinglePicture(@PathVariable("id") Long id) {
        return pictureService.getSinglePicture(id);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPicture(
            @RequestParam("file") MultipartFile file,
            @RequestParam("directory") String directory,
            @RequestParam("section") String section
            ) {
        /* Validation Code */
//        if (errors.hasErrors()) {
//            return ResponseUtility.handleResponses(errors.getFieldErrors(), HttpStatus.NOT_ACCEPTABLE);
//        }
        /* ----------------- */

        Picture picture = pictureService.storeImage(file, section, directory, file.getOriginalFilename());
        if (picture != null) {
            return ResponseUtility.responseMessage(picture, "Picture uploaded successfully", HttpStatus.OK);
        }
        return ResponseUtility.responseMessage("Failed to upload picture", HttpStatus.BAD_REQUEST);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable("id") Long id) {
        /* Operation Code */
        return ResponseUtility.responseMessage( pictureService.deletePicture(id) + " deleted", HttpStatus.OK);
    }
}

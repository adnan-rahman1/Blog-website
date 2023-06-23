package com.dk.portfolio.controller;

import com.dk.portfolio.model.Post;
import com.dk.portfolio.service.PostService;
import com.dk.portfolio.utility.ResponseUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;

@RestController
@RequestMapping("/api/blog")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<?> getAllPost() {
        return new ResponseEntity<>(postService.getAllPosts(), HttpStatus.OK);
    }

    @GetMapping("/page/{page}")
    ResponseEntity<?> getPostsByPage(
            @RequestParam("keyword") String keyword,
            @RequestParam("order") String order,
            @PathVariable("page") int page) {
        Page<Post> postsByPage = postService.getPostsByPage(page, keyword, order);
        HashMap<Object, Object> hashMap = new HashMap<>();
        hashMap.put("totalElements", postsByPage.getTotalElements());
        hashMap.put("totalPages", postsByPage.getTotalPages());
        hashMap.put("numberOfElements", postsByPage.getNumberOfElements());
        hashMap.put("posts", postsByPage.getContent());

        return new ResponseEntity<>(hashMap, HttpStatus.OK);
    }

    @GetMapping("/featured")
    public ResponseEntity<?> getAllFeaturedPost() {
        return new ResponseEntity<>(postService.getAllFeaturedPosts(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSinglePost(@PathVariable("id") Long id) {
        return new ResponseEntity<>(postService.getSinglePost(id), HttpStatus.OK);
    }


    @PostMapping("/create")
    public ResponseEntity<?> createPost(
            @RequestBody @Valid Post post,
            Errors errors) {
        if (errors.hasErrors()) {
            return ResponseUtility.errorResponse(errors.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }
        return ResponseUtility.responseMessage(postService.createPost(post), "You just published a new Post", HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePost(
            @PathVariable("id") Long id,
            @RequestBody Post post,
            Errors errors) {
        /* Validation Code */
        if (errors.hasErrors()) {
            return ResponseUtility.errorResponse(errors.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }
        /* Operation Code */
        Post p = postService.updatePost(post, id);
        return ResponseUtility.responseMessage(p, "Updated", HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") Long id) {
        return ResponseUtility.responseMessage(postService.deletePost(id) + " deleted", HttpStatus.OK);
    }
}
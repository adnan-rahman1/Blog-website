package com.dk.portfolio.controller;

import com.dk.portfolio.model.Category;
import com.dk.portfolio.model.Tag;
import com.dk.portfolio.service.TagService;
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
@RequestMapping("/api/tag")
//@CrossOrigin(origins = "*")
public class TagController {

    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public ResponseEntity<?> getAllTag() {
        return new ResponseEntity<>(tagService.getAllTags(), HttpStatus.OK);
    }

    @GetMapping("/page/{page}")
    ResponseEntity<?> getTagsByPage(
            @RequestParam("keyword") String keyword,
            @RequestParam("order") String order,
            @PathVariable("page") int page) {
        Page<Tag> tagsByPage = tagService.getTagsByPage(page, keyword, order);
        HashMap<Object, Object> hashMap = new HashMap<>();
        hashMap.put("totalElements", tagsByPage.getTotalElements());
        hashMap.put("totalPages", tagsByPage.getTotalPages());
        hashMap.put("numberOfElements", tagsByPage.getNumberOfElements());
        hashMap.put("tags", tagsByPage.getContent());

        return new ResponseEntity<>(hashMap, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTag(
            @RequestBody @Valid Tag tag,
            Errors errors) {
        /* Validation Code */
        if (errors.hasErrors()) {
            return ResponseUtility.errorResponse(errors.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }
        /* Operation Code */
        Tag t = tagService.createTag(tag);
        return ResponseUtility.responseMessage(t, t.getName() + " created", HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTag(
            @PathVariable("id") Long id,
            @RequestBody @Valid Tag tag,
            Errors errors) {
        /* Validation Code */
        if (errors.hasErrors()) {
            return ResponseUtility.errorResponse(errors.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }
        /* Operation Code */
        Tag t = tagService.updateTag(tag, id);
        return ResponseUtility.responseMessage(t, "Updated", HttpStatus.OK);
        /* -------------------------- */
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTag(@PathVariable("id") Long id) {
        /* Operation Code */
        return ResponseUtility.responseMessage( tagService.deleteTag(id) + " deleted", HttpStatus.OK);
        /* -------------------------- */
    }
}

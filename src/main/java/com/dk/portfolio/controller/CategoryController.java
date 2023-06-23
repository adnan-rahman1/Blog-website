package com.dk.portfolio.controller;

import com.dk.portfolio.model.Category;
import com.dk.portfolio.model.Post;
import com.dk.portfolio.service.CategoryService;
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
@RequestMapping("/api/category")
//@CrossOrigin(origins = "*")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<?> getAllCategory() {
        return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
    }

    @GetMapping("/page/{page}")
    ResponseEntity<?> getCategoriesByPage(
            @RequestParam("keyword") String keyword,
            @RequestParam("order") String order,
            @PathVariable("page") int page) {
        Page<Category> categoriesByPage = categoryService.getCategoriesByPage(page, keyword, order);
        HashMap<Object, Object> hashMap = new HashMap<>();
        hashMap.put("totalElements", categoriesByPage.getTotalElements());
        hashMap.put("totalPages", categoriesByPage.getTotalPages());
        hashMap.put("numberOfElements", categoriesByPage.getNumberOfElements());
        hashMap.put("categories", categoriesByPage.getContent());

        return new ResponseEntity<>(hashMap, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCategory(
            @RequestBody @Valid Category category,
            Errors errors) {
        /* Validation Code */
        if (errors.hasErrors()) {
            return ResponseUtility.errorResponse(errors.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }
        /* Operation Code */
        Category c = categoryService.createCategory(category);
        return ResponseUtility.responseMessage(c, c.getName() + " created", HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCategory(
            @PathVariable("id") Long id,
            @RequestBody @Valid Category category,
            Errors errors) {
        /* Validation Code */
        if (errors.hasErrors()) {
            return ResponseUtility.errorResponse(errors.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }
        /* Operation Code */
        Category c = categoryService.updateCategory(category, id);
        return ResponseUtility.responseMessage(c, "Updated", HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") Long id) {
        /* Operation Code */

        return ResponseUtility.responseMessage( categoryService.deleteCategory(id) + " deleted", HttpStatus.OK);
    }
}


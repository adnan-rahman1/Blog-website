package com.dk.portfolio.service.impl;

import com.dk.portfolio.exception.CustomExceptionResponse;
import com.dk.portfolio.model.Category;
import com.dk.portfolio.model.Post;
import com.dk.portfolio.repository.CategoryRepository;
import com.dk.portfolio.service.CategoryService;
import com.dk.portfolio.service.PostService;
import com.dk.portfolio.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final int PAGE_SIZE = 10;

    @Autowired
    private CategoryServiceImpl(
            CategoryRepository categoryRepository
    ) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        List<Category> all = categoryRepository.findAll();
        if (all.isEmpty()) {
            throw new CustomExceptionResponse("No category found");
        }
        return all;
    }

    @Override
    public Page<Category> getCategoriesByPage(int page, String keyword, String order) {
        Sort.Direction direction = order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, PAGE_SIZE, Sort.by(direction, "id"));
        Page<Category> categoryPage = categoryRepository.findAll(pageable);
        if (!keyword.equals("")) {
            categoryPage = categoryRepository.findAll(keyword, pageable);
        }
        if (categoryPage.isEmpty()) {
            throw new CustomExceptionResponse("Add Category");
        }
        return categoryPage;
    }

    @Override
    public Category getCategory(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> {
            throw new CustomExceptionResponse("Add category");
        });
    }

    @Override
    public Category createCategory(Category category) {
        String name = category.getName().trim().toLowerCase();
        if (categoryRepository.findByName(name).isPresent()) {
            throw new CustomExceptionResponse(name + " already exist");
        }
        category.setName(name);
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category, Long id) {
        Category oldCategory = categoryRepository.findById(id).orElseThrow(() -> {
            throw new CustomExceptionResponse("Category doesn't exist");
        });
        oldCategory.setName(category.getName().trim().toLowerCase());
        return categoryRepository.save(oldCategory);
    }

    @Override
    public String deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> {
            throw new CustomExceptionResponse("Category doesn't exist");
        });

        try {
            categoryRepository.delete(category);
        } catch (DataIntegrityViolationException e) {
            throw new CustomExceptionResponse(category.getName() + " is being used.");
        }
        return category.getName();
    }
}

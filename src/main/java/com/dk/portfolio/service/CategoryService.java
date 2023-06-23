package com.dk.portfolio.service;

import com.dk.portfolio.model.Category;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();
    Page<Category> getCategoriesByPage(int page, String keyword, String order);
    Category getCategory(Long id);
    Category createCategory(Category category);
    Category updateCategory(Category category, Long id);
    String deleteCategory(Long id);
}

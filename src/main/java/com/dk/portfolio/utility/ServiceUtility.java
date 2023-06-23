package com.dk.portfolio.utility;

import com.dk.portfolio.model.Category;
import com.dk.portfolio.model.Picture;
import com.dk.portfolio.model.Tag;
import com.dk.portfolio.repository.CategoryRepository;
import com.dk.portfolio.repository.PictureRepository;
import com.dk.portfolio.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Configuration
public class ServiceUtility {

    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final PictureRepository pictureRepository;

    @Autowired
    public ServiceUtility(
            CategoryRepository categoryRepository,
            TagRepository tagRepository,
            PictureRepository pictureRepository) {
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
        this.pictureRepository = pictureRepository;

    }

    public Set<Tag> getAllTagsAssociateWithEntity(Set<Tag> tags) {
        Set<Tag> tagSet = new HashSet<>();
        tagRepository.deleteByName("untag");
        for (Tag tag: tags) {
            tagSet.add(tagRepository.findByName(tag.getName()).orElseThrow());
        }
        return tagSet;
    }
    public Set<Category> getAllCategoriesAssociateWithEntity(Set<Category> categories) {
        Set<Category> categorySet = new HashSet<>();
        tagRepository.deleteByName("uncategorized");
        for (Category category: categories) {
            categorySet.add(categoryRepository.findByName(category.getName()).orElseThrow());
        }
        return categorySet;
    }

    public Set<Picture> getAllPictureAssociateWithEntity(Set<Picture> pictures) {
        Set<Picture> pictureSet = new HashSet<>();
        for (Picture picture: pictures) {
            pictureSet.add(pictureRepository.findPictureByName(picture.getName()).orElse(null));
        }
        return pictureSet;
    }
}

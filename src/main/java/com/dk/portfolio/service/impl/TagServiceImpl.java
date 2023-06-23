package com.dk.portfolio.service.impl;

import com.dk.portfolio.exception.CustomExceptionResponse;
import com.dk.portfolio.model.Category;
import com.dk.portfolio.model.Tag;
import com.dk.portfolio.repository.TagRepository;
import com.dk.portfolio.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private final int PAGE_SIZE = 10;

    @Autowired
    public TagServiceImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    public List<Tag> getAllTags() {
        List<Tag> all = tagRepository.findAll();
        if (all.isEmpty()) {
            throw new CustomExceptionResponse("Add tag");
        }
        return all;
    }

    @Override
    public Page<Tag> getTagsByPage(int page, String keyword, String order) {
        Sort.Direction direction = order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, PAGE_SIZE, Sort.by(direction, "id"));
        Page<Tag> tagPage = tagRepository.findAll(pageable);
        if (!keyword.equals("")) {
            tagPage = tagRepository.findAll(keyword, pageable);
        }
        if (tagPage.isEmpty()) {
            throw new CustomExceptionResponse("Add Tag");
        }
        return tagPage;
    }

    @Override
    public Tag getTag(Long id) {
        return tagRepository.findById(id).orElseThrow(() -> {
            throw new CustomExceptionResponse("Tag doesn't exist");
        });
    }

    @Override
    public Tag createTag(Tag tag) {
        String name = tag.getName().trim().toLowerCase();
        if (tagRepository.findByName(name).isPresent()) {
            throw new CustomExceptionResponse(name + " already exist");
        }
        tag.setName(name);
        return tagRepository.save(tag);
    }

    @Override
    public Tag updateTag(Tag tag, Long id) {
        Tag oldTag = tagRepository.findById(id).orElseThrow(() -> {
            throw new CustomExceptionResponse("Tag doesn't exist");
        });
        oldTag.setName(tag.getName().trim().toLowerCase());
        return tagRepository.save(oldTag);
    }

    @Override
    public String deleteTag(Long id) {
        Tag tag = tagRepository.findById(id).orElseThrow(() -> {
            throw new CustomExceptionResponse("Tag doesn't exist");
        });
        try {
            tagRepository.delete(tag);
        } catch (DataIntegrityViolationException e) {
            throw new CustomExceptionResponse(tag.getName() + " is being used.");
        }
        return tag.getName();
    }
}

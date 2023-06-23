package com.dk.portfolio.service;

import com.dk.portfolio.model.Tag;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TagService {
    List<Tag> getAllTags();
    Page<Tag> getTagsByPage(int page, String keyword, String order);
    Tag getTag(Long id);
    Tag createTag(Tag tag);
    Tag updateTag(Tag tag, Long id);
    String deleteTag(Long id);
}

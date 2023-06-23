package com.dk.portfolio.repository;

import com.dk.portfolio.model.Category;
import com.dk.portfolio.model.Picture;
import com.dk.portfolio.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends PagingAndSortingRepository<Post, Long> {

    String filterQueryString = "select * from post where concat(title, '', (select group_concat(category.name) as categories from category, " +
            "post_categories where post.id = post_categories.post_id and category.id = post_categories.categories_id), '', " +
            "(select group_concat(tag.name) as tags from tag, post_tags where post.id = post_tags.post_id and tag.id = post_tags.tags_id)) " +
            "like %:keyword%";

    Optional<Post> findByPictures(Picture picture);
    Optional<Post> findBySlug(String slug);

    List<Post> findAllByFeaturedOrderByCreatedAtDesc(Boolean featuredPost);

    @Query(
            value=filterQueryString,
            nativeQuery=true
    )
    Page<Post> findAll(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.id = (SELECT MAX(id) FROM Post WHERE id < :id)")
    Optional<Post> findPrevPost(Long id);

    @Query("SELECT p FROM Post p WHERE p.id = (SELECT MIN(id) FROM Post WHERE id > :id)")
    Optional<Post> findNextPost(Long id);
}

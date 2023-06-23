package com.dk.portfolio.repository;

import com.dk.portfolio.model.Category;
import com.dk.portfolio.model.Picture;
import com.dk.portfolio.model.Post;
import com.dk.portfolio.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    String filterQueryString = "select * from category where name like %:keyword%";
    @Query(
            value=filterQueryString,
            nativeQuery=true
    )
    Page<Category> findAll(@Param("keyword") String keyword, Pageable pageable);
    Optional<Category> findByName(String name);
}

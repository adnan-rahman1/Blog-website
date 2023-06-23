package com.dk.portfolio.repository;

import com.dk.portfolio.model.Category;
import com.dk.portfolio.model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    String filterQueryString = "select * from tag where name like %:keyword%";
    @Query(
            value=filterQueryString,
            nativeQuery=true
    )
    Page<Tag> findAll(@Param("keyword") String keyword, Pageable pageable);
    Optional<Tag> findByName(String name);
    void deleteByName(String name);
}

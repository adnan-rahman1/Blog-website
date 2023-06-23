package com.dk.portfolio.repository;

import com.dk.portfolio.model.Picture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {
    @Query("SELECT p from Picture p WHERE p.section not in ('profile')")
    List<Picture> findAll();
    Optional<Picture> findPictureByName(String name);
    Picture findBySection(String section);
    void deleteByName(String name);
}

package com.dk.portfolio.repository;

import com.dk.portfolio.model.Picture;
import com.dk.portfolio.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findByPictures(Picture picture);
}

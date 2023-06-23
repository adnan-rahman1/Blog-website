package com.dk.portfolio.repository;

import com.dk.portfolio.model.Social;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SocialRepository  extends JpaRepository<Social, Long> {
    Optional<Social> findByFacebook(String f);
    Optional<Social> findByGithub(String g);
    Optional<Social> findByLinkedin(String l);
}

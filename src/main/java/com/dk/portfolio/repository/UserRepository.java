package com.dk.portfolio.repository;

import com.dk.portfolio.model.Picture;
import com.dk.portfolio.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByAvatar(Picture picture);
}

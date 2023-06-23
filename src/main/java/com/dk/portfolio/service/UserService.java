package com.dk.portfolio.service;

import com.dk.portfolio.model.Picture;
import com.dk.portfolio.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User getUserByEmail(String email);
    User getUser(Long id);
    User createNewUser(User user);
    User updateUser(User user, Long id);
    String deleteUser(Long id);
    void updateUserByAvatar(Picture picture);
    String userForgetPassword(final String email);
}

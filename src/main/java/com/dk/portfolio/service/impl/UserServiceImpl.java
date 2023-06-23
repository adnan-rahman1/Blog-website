package com.dk.portfolio.service.impl;

import com.dk.portfolio.exception.CustomExceptionResponse;
import com.dk.portfolio.model.*;
import com.dk.portfolio.repository.UserRepository;
import com.dk.portfolio.service.UserService;
import com.dk.portfolio.utility.SecurityUtils;
import com.dk.portfolio.utility.ServiceUtility;
import com.dk.portfolio.utility.SocialUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final SecurityUtils securityUtils;

    @Autowired
    public UserServiceImpl(
            UserRepository userRepository,
            SecurityUtils securityUtils,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.securityUtils = securityUtils;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            throw new CustomExceptionResponse(("No user found"));
        });
        user.setPassword("");
        return user;
    }

    @Override
    public User getUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new CustomExceptionResponse("No user found");
        });
        user.setPassword("");
        return user;
    }


    @Override
    public User createNewUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new CustomExceptionResponse(user.getEmail() + " is already exist");
        }

        Set<Role> roles = securityUtils.setDefaultRoles();
        String encodePassword = passwordEncoder.encode(user.getPassword());

        user.setPassword(encodePassword);
        user.setRoles(roles);
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user, Long id) {
        User usr = userRepository.findById(id).orElseThrow(() -> {
            throw new CustomExceptionResponse("User doesn't exist");
        });
        usr.setFirstName(user.getFirstName().trim());
        usr.setLastName(user.getLastName().trim());
        usr.setEmail(user.getEmail());
        usr.setAbout(user.getAbout());
        if (!user.getPassword().equals("")) {
            usr.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        if (user.getSocial() != null) {
            usr.setSocial(user.getSocial());
        }
        if (user.getAvatar() != null) {
            usr.setAvatar(user.getAvatar());
        }
        userRepository.save(usr);
        usr.setPassword("");
        return usr;
    }

    @Override
    public String deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            throw new CustomExceptionResponse("User doesn't exist");
        });
        userRepository.delete(user);
        return user.getEmail();
    }

    @Override
    public void updateUserByAvatar(Picture picture) {
        User user = userRepository.findByAvatar(picture).orElse(null);
        if (user != null) {
            user.setAvatar(null);
            userRepository.save(user);
        }
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        } else {
            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), user.getRoles());
        }
    }


    @Override
    public String userForgetPassword(final String email) {
        User user = getUserByEmail(email);
        if (user != null) {
            String tempPass = securityUtils.generateTemporaryPassword();
            return tempPass;
        }
        return null;
    }
}

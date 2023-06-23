package com.dk.portfolio.utility;

import com.dk.portfolio.model.Role;
import com.dk.portfolio.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import java.util.*;
import java.util.stream.Collectors;

@Configuration
public class SecurityUtils {

    private final RoleService roleService;

    @Autowired
    public SecurityUtils(RoleService roleService) {
        this.roleService = roleService;
    }

    public Set<Role> setDefaultRoles() {
        Role role = new Role();
        role.setRole("ROLE_USER");
        Set<Role> roles = new HashSet<>();
        Role tmp = roleService.findRole(role);
        roles.add(tmp == null ? role : tmp);
        return roles;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public boolean checkIfOnlyPasswordIsEmptyOrNot(Errors errors) {
        return errors.getFieldErrorCount() <= 1 &&
                errors.hasFieldErrors("password");
    }

    public List<FieldError> excludePasswordError(Errors errors) {
        List<FieldError> fieldErrors = errors.getFieldErrors();
        String passwordErr = String.valueOf(errors.getFieldValue("password"));
        if (passwordErr.equals("")) {
            fieldErrors = fieldErrors.stream().filter(
                    fieldError -> !fieldError.getField().equals("password")).collect(Collectors.toList());
        }
        return fieldErrors;
    }

    public String generateTemporaryPassword() {
        // A strong password has Cap_chars, Lower_chars,
        // numeric value and symbols. So we are using all of
        // them to generate our password
        final String Capital_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        final String Small_chars = "abcdefghijklmnopqrstuvwxyz";
        final String numbers = "0123456789";
        final String symbols = "!@#$%^&*_=+-/.?<>)";


        String values = Capital_chars + Small_chars +
                numbers + symbols;

        // Using random method
        Random rndm_method = new Random();

        char[] password = new char[12];

        for (int i = 0; i < 12; i++)
        {
            // Use of charAt() method : to get character value
            // Use of nextInt() as it is scanning the value as int
            password[i] = values.charAt(rndm_method.nextInt(values.length()));

        }
        return String.valueOf(password);
    }
}

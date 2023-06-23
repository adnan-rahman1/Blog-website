package com.dk.portfolio.controller;

import com.dk.portfolio.model.User;
import com.dk.portfolio.security.CustomAuthenticationManager;
import com.dk.portfolio.security.JwtSecurity;
import com.dk.portfolio.service.UserService;
import com.dk.portfolio.utility.ResponseUtility;
import com.dk.portfolio.utility.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
//@CrossOrigin(origins = "*")
public class UserController {


    private final UserService userService;
    private final SecurityUtils securityUtils;
    private final CustomAuthenticationManager authenticationManager;
    private final JwtSecurity jwtSecurity;

    @Value("${admin.email}")
    private String ADMIN_EMAIL;

    @Autowired
    public UserController(
            CustomAuthenticationManager authenticationManager,
            JwtSecurity jwtSecurity,
            UserService userService,
            SecurityUtils securityUtils) {
        this.authenticationManager = authenticationManager;
        this.jwtSecurity = jwtSecurity;
        this.userService = userService;
        this.securityUtils = securityUtils;
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> getUser(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(
            @RequestBody @Valid User user,
            Errors errors) {
        /* Validation Code */
        if (errors.hasErrors()) {
            return ResponseUtility.errorResponse(errors.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }
        /* Operation Code */
        return ResponseUtility.responseMessage(
                userService.createNewUser(user),
                "Your have been registered. To activate your account check your email and confirm your registration.", HttpStatus.OK);
    }

    @GetMapping("/basic-info")
    public ResponseEntity<?> getBasicUserInfo() {
        Map<Object, Object> res = new HashMap<>();
        res.put("user", userService.getUserByEmail(ADMIN_EMAIL));
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser() {

        Authentication context = SecurityContextHolder.getContext().getAuthentication();
        User user = null;
        if (context.getName().equals("anonymousUser")) {
            user = userService.getUserByEmail(ADMIN_EMAIL);
            context.setAuthenticated(false);
        }
        else user = userService.getUserByEmail(context.getName());

        Map<Object, Object> res = new HashMap<>();
        res.put("user", user);
        res.put("authenticated", context.isAuthenticated());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateUser(
            @RequestBody User usr) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(usr.getEmail(), usr.getPassword()));

        final UserDetails userDetails = userService.loadUserByUsername(usr.getEmail());
        final String token = jwtSecurity.generateToken(userDetails);

        final User user = userService.getUserByEmail(userDetails.getUsername());

        Map<Object, Object> res = new HashMap<>();
        res.put("user", user);
        res.put("authenticated", authenticate.isAuthenticated());
        res.put("token", "Bearer " + token);
        res.put("message", "You are successfully logged in");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public String logoutRedirect() {
        return "redirect:login";
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable("id") Long id,
            @RequestBody @Valid User user,
            Errors errors) {

        if (errors.hasErrors() && !securityUtils.checkIfOnlyPasswordIsEmptyOrNot(errors)) {
            /* Exclude Password Error If Multiple Error Found & Password Is Still Empty */
            List<FieldError> fieldErrors = securityUtils.excludePasswordError(errors);
            return ResponseUtility.errorResponse(fieldErrors, HttpStatus.BAD_REQUEST);
        }
        /* ---------------- */
        return ResponseUtility.responseMessage(userService.updateUser(user, id), "Updated", HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        /* Operation Code */
        return ResponseUtility.responseMessage(userService.deleteUser(id) + " deleted", HttpStatus.OK);
    }


    @PostMapping("/forget/password")
    public ResponseEntity<?> forgetPassword(@RequestParam("email") String email) {
        String pass = userService.userForgetPassword(email);

        return ResponseUtility.responseMessage(pass, HttpStatus.OK);
    }

}

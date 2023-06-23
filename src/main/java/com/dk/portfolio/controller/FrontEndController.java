package com.dk.portfolio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

//@CrossOrigin(origins = "*")
@Controller
public class FrontEndController {

    @GetMapping({
            "/",
            "/blog", "/blog/**/**",
            "/project",
            "/about",
            "/signin",
            "/signup",
            "/reset/password",
            "/privacy-policy",
            "/cookies-policy",
            "/terms-conditions",
            "/disclaimer" })
    public String frontEndError() {
        return "index.html";
    }

    @GetMapping("/blog/{id}/{slug}")
    public String getSinglePostWithSlug(@PathVariable("id") Long id, @PathVariable("slug") String slug) {
        return "redirect:/blog";
    }
}

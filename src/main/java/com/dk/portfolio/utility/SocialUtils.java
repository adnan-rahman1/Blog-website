package com.dk.portfolio.utility;

import com.dk.portfolio.service.SocialService;
import org.springframework.stereotype.Service;

@Service
public class SocialUtils {

    private final SocialService socialService;

    public SocialUtils(SocialService socialService) {
        this.socialService = socialService;
    }

//    public boolean checkSocialUrl(String link) {
//        try {
//            new URL(link).toURI();
//            return true;
//        } catch (MalformedURLException | URISyntaxException e) {
//            return false;
//        }
//    }
}

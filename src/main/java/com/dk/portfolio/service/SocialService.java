package com.dk.portfolio.service;

import com.dk.portfolio.model.Social;

import java.util.List;

public interface SocialService {
    List<Social> getAllSocials();
    Social createSocial(Social socialLink);
    Social updateSocial(Social social, Long id);
    Social deleteSocial(Long id);
}

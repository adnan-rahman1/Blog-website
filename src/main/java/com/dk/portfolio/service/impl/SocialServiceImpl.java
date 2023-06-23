package com.dk.portfolio.service.impl;

import com.dk.portfolio.model.Social;
import com.dk.portfolio.repository.SocialRepository;
import com.dk.portfolio.service.SocialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SocialServiceImpl implements SocialService {

    private final SocialRepository socialRepository;

    @Autowired
    public SocialServiceImpl(SocialRepository socialRepository) {
        this.socialRepository = socialRepository;
    }

    @Override
    public List<Social> getAllSocials() {
        return socialRepository.findAll();
    }

    @Override
    public Social createSocial(Social social) {
        return socialRepository.save(social);
    }

    @Override
    public Social updateSocial(Social social, Long id) {
        Social oldSocial = socialRepository.findById(id).orElse(null);
//        if (oldSocial != null && SocialUtility.checkSocialUrl(social.getLink())) {
//            oldSocial.setLink(social.getLink().trim());
//            return socialRepository.save(oldSocial);
//        }
        return oldSocial;
    }

    @Override
    public Social deleteSocial(Long id) {
        Social social = socialRepository.findById(id).orElse(null);
//        if (social != null){
//            social.setLink("");
//            socialRepository.save(social);
//        }
        return social;
    }
}

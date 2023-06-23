package com.dk.portfolio.service.impl;

import com.dk.portfolio.model.Role;
import com.dk.portfolio.repository.RoleRepository;
import com.dk.portfolio.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role findRole(Role role) {
        return roleRepository.findByRole(role.getRole()).orElse(null);
    }

    @Override
    public Role createRole(Role role) {
        Role tmpRole = roleRepository.findByRole(role.getRole()).orElse(null);
        if (tmpRole == null) {
            return roleRepository.save(role);
        }
        return tmpRole;
    }
}

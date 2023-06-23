package com.dk.portfolio.service;


import com.dk.portfolio.model.Role;

public interface RoleService {
    Role findRole(Role role);
    Role createRole(Role role);
}

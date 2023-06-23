package com.dk.portfolio.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "First name is required")
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 15)
    private String firstName;
    @NotNull(message = "Last name is required")
    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 15)
    private String lastName;
    @NotNull(message = "Email is required")
    @NotBlank(message = "Email is required")
    @Column(unique = true)
    @Email(message = "Please enter a valid email")
    private String email;
    @NotNull(message = "Password is required")
    @NotBlank(message = "Password is required")
    private String password;

    @Column(columnDefinition = "TEXT")
    private String about;

    @OneToOne(targetEntity = Social.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Social social;

    @OneToOne(targetEntity = Picture.class, fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private Picture avatar;

    @ManyToMany(targetEntity = Role.class, fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Set<Role> roles;

}

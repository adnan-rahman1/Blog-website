package com.dk.portfolio.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Project name is required")
    @NotBlank(message = "Project name cannot be empty")
    @Size(min = 10, max = 150)
    private String name;
    @NotNull(message = "Project description is required")
    @NotBlank(message = "Project description cannot be empty")
    @Size(min = 10, max = 1500)
    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToMany(fetch = FetchType.LAZY, targetEntity = Picture.class, cascade = CascadeType.REMOVE)
    private Set<Picture> pictures;

    @NotNull(message = "Project link is required")
    @NotBlank(message = "Project link cannot be empty")
    private String link;

    @ManyToMany(fetch = FetchType.EAGER, targetEntity = Tag.class)
    private Set<Tag> tags;

    @ManyToMany(fetch = FetchType.EAGER, targetEntity = Category.class)
    private Set<Category> categories;
}

package com.dk.portfolio.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Post implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Title cannot be empty")
    @NotBlank(message = "Title cannot be empty")
    @Size(min = 10, max = 150)
    private String title;

    @NotBlank(message = "Subtitle cannot be empty")
    @NotNull(message = "Subtitle cannot be empty")
    @Size(min = 10, max = 255)
    private String subTitle;

    @NotNull(message = "Description cannot be empty")
    @NotBlank(message = "Description cannot be empty")
    @Size(min = 10)
    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Slug cannot be empty")
    @NotBlank(message = "Slug cannot be empty")
    private String slug;

    @Column(columnDefinition = "boolean default false")
    private boolean featured;

    @ManyToMany(fetch = FetchType.LAZY, targetEntity = Tag.class)
    private Set<Tag> tags;

    @ManyToMany(fetch = FetchType.LAZY, targetEntity = Category.class)
    private Set<Category> categories;

    @OneToMany(fetch = FetchType.LAZY, targetEntity = Picture.class, cascade = CascadeType.REMOVE)
    private Set<Picture> pictures;

    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime modifiedAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.modifiedAt = LocalDateTime.now();
    }

    @Transient
    private String humanReadableDate;
}

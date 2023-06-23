package com.dk.portfolio.model;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Social {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "varchar(255) default 'http://www.github.com'")
    private String github;
    @Column(columnDefinition = "varchar(255) default 'http://www.facebook.com'")
    private String facebook;
    @Column(columnDefinition = "varchar(255) default 'http://www.linkedin'")
    private String linkedin;
    @Column(columnDefinition = "varchar(255) default 'http://www.youtube.com'")
    private String youtube;
    @Column(columnDefinition = "varchar(255) default 'http://www.stackoverflow.com'")
    private String stackoverflow;
    @Column(columnDefinition = "varchar(255) default 'http://www.hackerrank.com'")
    private String hackerrank;
    @Column(columnDefinition = "varchar(255) default 'http://www.artstation.com'")
    private String artstation;
}

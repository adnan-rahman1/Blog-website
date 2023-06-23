package com.dk.portfolio.service;

import com.dk.portfolio.model.Category;
import com.dk.portfolio.model.Picture;
import com.dk.portfolio.model.Project;

import java.util.HashSet;
import java.util.List;

public interface ProjectService {
    List<Project> getAllProjects();
    Project createProject(Project project);
    Project getSingleProjectDetails(Long id);
    Project updateProject(Project project, Long id);
    String deleteProject(Long id);
    void updateProjectByPicture(Picture picture);
}

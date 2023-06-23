package com.dk.portfolio.service.impl;

import com.dk.portfolio.exception.CustomExceptionResponse;
import com.dk.portfolio.model.Picture;
import com.dk.portfolio.model.Project;
import com.dk.portfolio.repository.ProjectRepository;
import com.dk.portfolio.service.ProjectService;
import com.dk.portfolio.utility.ServiceUtility;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectServiceImpl(
            ProjectRepository projectRepository,
            ServiceUtility serviceUtility) {
        this.projectRepository = projectRepository;
    }


    @Override
    public List<Project> getAllProjects() {
        List<Project> all = projectRepository.findAll();
        if (all.isEmpty()) {
            throw new CustomExceptionResponse("Add project");
        }
        return all;
    }

    @Override
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public Project getSingleProjectDetails(Long id) {
        return projectRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );
    }

    @Override
    @Transactional
    public Project updateProject(Project project, Long id) {
        Project tmp = projectRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        tmp.setName(project.getName());
        tmp.setDescription(project.getDescription());
        tmp.setLink(project.getLink());
        tmp.setTags(project.getTags());
        tmp.setCategories(project.getCategories());
        tmp.setPictures(project.getPictures());
        return projectRepository.save(tmp);
    }

    @Override
    public String deleteProject(Long id) {
        Project project = projectRepository.findById(id).orElseThrow(() -> {
            throw new CustomExceptionResponse("Project doesn't exist");
        });

        Set<Picture> pictures = project.getPictures();
        boolean isDeleted = false;
        if (pictures.isEmpty()) {
            isDeleted = true;
        } else {
            for (Picture picture : pictures) {
                File file = new File(System.getProperty("user.dir") + picture.getLocation());
                if (file.exists()) {
                    isDeleted = file.delete();
                    if (!isDeleted) {
                        throw new CustomExceptionResponse("Failed to delete some image");
                    }
                }
            }
        }

        if (isDeleted) {
            String projectSlug = String.join("-", project.getName().toLowerCase().split(" "));
            File dir = new File(System.getProperty("user.dir") + "/public/project/" + projectSlug);
            try {
                FileUtils.deleteDirectory(dir);
                projectRepository.deleteById(id);
            } catch (IOException e) {
                throw new CustomExceptionResponse("Failed to delete project");
            }
        }
        return project.getName();
    }

    @Override
    public void updateProjectByPicture(Picture picture) {
        Project project = projectRepository.findByPictures(picture).orElse(null);
        if (project != null) {
            Set<Picture> pictures = project.getPictures();
            pictures.remove(picture);
            project.setPictures(pictures);
            projectRepository.save(project);
        }
    }
}

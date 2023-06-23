package com.dk.portfolio.controller;

import com.dk.portfolio.model.Project;
import com.dk.portfolio.service.ProjectService;
import com.dk.portfolio.utility.ResponseUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/project")
//@CrossOrigin(origins = "*")
public class ProjectController {
    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<?> getAllProject() {
        return new ResponseEntity<>(projectService.getAllProjects(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Project getSingleProject(@PathVariable("id") Long id) {
        return projectService.getSingleProjectDetails(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProject(
            @RequestBody @Valid Project project,
            Errors errors) {
        /* Validation Code */
        if (errors.hasErrors()) {
            return ResponseUtility.errorResponse(errors.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }
        return ResponseUtility.responseMessage(projectService.createProject(project), "Added successfully", HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProject(
            @PathVariable("id") Long id,
            @Valid @RequestBody Project project,
            Errors errors) {
        /* Validation Code */
        if (errors.hasErrors()) {
            return ResponseUtility.errorResponse(errors.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }
        /* Operation Code */
        Project p = projectService.updateProject(project, id);
        return ResponseUtility.responseMessage(p, "Updated", HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable("id") Long id) {
        return ResponseUtility.responseMessage(projectService.deleteProject(id) + " deleted", HttpStatus.OK);
    }
}

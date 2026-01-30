package com.Project.ProfileCard.about.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public class FullProfileDTO {
    public Long id;
    @NotBlank(message = "Name is required")
    @Size(max = 255, message = "Name is too long")
    public String name;
    public String job;
    @NotBlank(message = "Info is required")
    public String info;

    @NotBlank(message = "Phone is required")
    public String phone;
    @Email(message = "Email is not valid")
    @NotBlank(message = "Email is required")
    public String email;
    @NotBlank(message = "Location is required")
    public String location;

    public List<SimpleExperience> experinces;

    public static class SimpleExperience {
        public String date;
        public String experince;
    }
}


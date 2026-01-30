package com.Project.ProfileCard.about.contact;

import com.Project.ProfileCard.about.About;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone;
    private String email;
    private String location;

    @OneToOne
    @JoinColumn(name = "about_id")
    @JsonBackReference
    private About about;

    // ✅ GETTERS
    public Long getId() { return id; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    public String getLocation() { return location; }
    public About getAbout() { return about; }

    // ✅ SETTERS
    public void setId(Long id) { this.id = id; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setEmail(String email) { this.email = email; }
    public void setLocation(String location) { this.location = location; }
    public void setAbout(About about) { this.about = about; }
}

package com.Project.ProfileCard.about;

import com.Project.ProfileCard.about.contact.Contact;
import com.Project.ProfileCard.about.experience.Experinces;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class About {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String job;
    private String info;

    @OneToOne(mappedBy = "about", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Contact contact;

    @OneToMany(mappedBy = "about", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Experinces> experincesList = new ArrayList<>();

    // ✅ GETTERS
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getJob() { return job; }
    public String getInfo() { return info; }
    public Contact getContact() { return contact; }
    public List<Experinces> getExperincesList() { return experincesList; }

    // ✅ SETTERS
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setJob(String job) { this.job = job; }
    public void setInfo(String info) { this.info = info; }
    public void setContact(Contact contact) { this.contact = contact; }
    public void setExperincesList(List<Experinces> experincesList) { this.experincesList = experincesList; }
}

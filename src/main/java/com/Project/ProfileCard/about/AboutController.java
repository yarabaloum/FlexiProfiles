package com.Project.ProfileCard.about;

import com.Project.ProfileCard.about.contact.Contact;
import com.Project.ProfileCard.about.experience.Experinces;
import com.Project.ProfileCard.about.dto.FullProfileDTO;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class AboutController {

    @Autowired
    private AboutRepository aboutRepository;

    @GetMapping("/About")
    public List<About> getAllProfiles() {
        return aboutRepository.findAll();
    }


    @Transactional
    @PostMapping("/saveProfile")
    public About saveFullProfile(@Valid @RequestBody FullProfileDTO dto) {
        About about = new About();
        about.setName(dto.name);
        about.setJob(dto.job);
        about.setInfo(dto.info);

        Contact contact = new Contact();
        contact.setPhone(dto.phone);
        contact.setEmail(dto.email);
        contact.setLocation(dto.location);
        contact.setAbout(about);
        about.setContact(contact);


        List<Experinces> expList = new ArrayList<>();
        if (dto.experinces != null) {
            for (FullProfileDTO.SimpleExperience expDto : dto.experinces) {
                Experinces exp = new Experinces();
                exp.setDate(expDto.date);
                exp.setExperince(expDto.experince);
                exp.setAbout(about);
                expList.add(exp);
            }
        }

        about.setExperincesList(expList);



        return aboutRepository.save(about);
    }


    @GetMapping("/About/{id}")
    public About getAboutById(@PathVariable("id") Long id) {
        return aboutRepository.findById(id).orElse(null);
    }

    @Transactional
    @PutMapping("/About/{id}")
    public About updateProfile(@PathVariable Long id, @Valid@RequestBody FullProfileDTO dto){
    Optional<About> existing = aboutRepository.findById(id);
        if (existing.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found");
        }
        About about = existing.get();
        about.setName(dto.name);
        about.setJob(dto.job);
        about.setInfo(dto.info);


        Contact contact = about.getContact();
        if (contact == null) contact = new Contact();
        contact.setPhone(dto.phone);
        contact.setEmail(dto.email);
        contact.setLocation(dto.location);
        contact.setAbout(about);
        about.setContact(contact);


        List<Experinces> newList = new ArrayList<>();
        if (dto.experinces != null) {
            for (FullProfileDTO.SimpleExperience expDto : dto.experinces) {
                Experinces exp = new Experinces();
                exp.setDate(expDto.date);
                exp.setExperince(expDto.experince);
                exp.setAbout(about);
                newList.add(exp);
            }
        }
        about.getExperincesList().clear();
        about.getExperincesList().addAll(newList);

        return aboutRepository.save(about);
    }


    @DeleteMapping("/About/{id}")
    public void deleteProfile(@PathVariable Long id) {
        aboutRepository.deleteById(id);
    }

}

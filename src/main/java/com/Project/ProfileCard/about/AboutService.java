package com.Project.ProfileCard.about;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AboutService {

    @Autowired
    private AboutRepository aboutRepository;

    public Optional<About> findById(Long id) {
        return aboutRepository.findById(id);
    }

    public About save(About About) {
        return aboutRepository.save(About);
    }

}

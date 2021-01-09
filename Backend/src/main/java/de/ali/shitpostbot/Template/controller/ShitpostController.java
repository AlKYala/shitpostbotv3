package de.ali.shitpostbot.Template.controller;

import de.ali.shitpostbot.Template.repositories.TemplateRepository;
import de.ali.shitpostbot.Template.services.ShitpostService;
import de.ali.shitpostbot.Template.services.TemplateService;
import de.ali.shitpostbot.shared.model.Shitpost;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/shitpost")
@RequiredArgsConstructor
public class ShitpostController {

    TemplateService templateService;
    ShitpostService shitpostService;
    TemplateRepository templateRepository;

    public ShitpostController(TemplateService templateService,
                              ShitpostService shitpostService,
                              TemplateRepository templateRepository) {
        this.templateService = templateService;
        this.shitpostService = shitpostService;
        this.templateRepository = templateRepository;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}")
    public Shitpost getShitpost(@PathVariable Long id) throws IOException {
        return this.shitpostService.generateShitpost(id);
    }

    /**
     * Generates a shitpost at random - without a specified Template or Template id
     * @return A shitpost with random ID chosen in backend
     * @throws IOException
     */
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/random")
    public Shitpost getShitPost() throws IOException {
        long numberTemplates = this.templateRepository.count();
        long randomID = 1 + ((long) (Math.random() * numberTemplates));
        randomID = (randomID > numberTemplates) ? numberTemplates : randomID;
        return this.shitpostService.generateShitpost(randomID);
    }
}

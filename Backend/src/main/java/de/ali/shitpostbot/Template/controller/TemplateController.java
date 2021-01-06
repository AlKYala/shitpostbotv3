package de.ali.shitpostbot.Template.controller;

import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.Template.services.TemplateService;
import de.ali.shitpostbot.shared.controller.BaseController;
import de.ali.shitpostbot.shared.model.DrawnTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/templates")
@RequiredArgsConstructor
public class TemplateController implements BaseController<Template, Long> {
    @Autowired
    private TemplateService templateService;

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<Template> findAll() {
        return this.templateService.findAll();
    }

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}")
    public Template findById(@PathVariable Long id) {
        return this.templateService.findById(id);
    }

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public Template create(@RequestBody Template template) {
        return this.templateService.create(template);
    }

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public Long delete(@PathVariable Long id) {
        return this.templateService.deleteById(id);
    }

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{id}")
    public Template update(@RequestBody Template template, @PathVariable Long id) {
        return this.templateService.update(id, template);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/draw/{id}")
    public DrawnTemplate getBase64Representation(@PathVariable Long id) throws IOException {
        Template template = this.findById(id);
        DrawnTemplate d = new DrawnTemplate();
        d.setBase64Representation(this.templateService.drawCoordinates(template));
        return d;
    }
}

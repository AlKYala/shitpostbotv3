package de.ali.shitpostbot.Template.controller;

import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.Template.services.TemplateService;
import de.ali.shitpostbot.shared.controller.BaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/templates")
@RequiredArgsConstructor
public class TemplateController implements BaseController<Template, Long> {
    @Autowired
    private TemplateService templateService;

    @Override
    @GetMapping
    public List<Template> findAll() {
        return this.templateService.findAll();
    }

    @Override
    @GetMapping("/{id}")
    public Template findById(@PathVariable Long id) {
        return this.templateService.findById(id);
    }

    @Override
    @PostMapping
    public Template create(@RequestBody Template template) {
        return this.templateService.create(template);
    }

    @Override
    @DeleteMapping("/{id}")
    public Long delete(@PathVariable Long id) {
        return this.templateService.deleteById(id);
    }

    @Override
    @PutMapping("/{id}")
    public Template update(@RequestBody Template template, @PathVariable Long id) {
        return this.templateService.update(id, template);
    }
}

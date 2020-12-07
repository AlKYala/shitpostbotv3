package de.ali.shitpostbot.Image.controller;

import de.ali.shitpostbot.Image.model.Image;
import de.ali.shitpostbot.Image.service.ImageService;
import de.ali.shitpostbot.shared.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class ImageController implements BaseController<Image, Long> {
    @Autowired
    private ImageService imageService;

    @Override
    @GetMapping
    public List<Image> findAll() {
        return this.imageService.findAll();
    }

    @Override
    @GetMapping("/{id}")
    public Image findById(@PathVariable Long id) {
        return this.imageService.findById(id);
    }

    @Override
    @PostMapping
    public Image create(@RequestBody Image image) {
        return this.imageService.create(image);
    }

    @Override
    @DeleteMapping("/{id}")
    public Long delete(@PathVariable Long id) {
        return this.imageService.deleteById(id);
    }

    @Override
    @PutMapping("/{id}")
    public Image update(@RequestBody Image image, @PathVariable Long id) {
        return this.imageService.update(id, image);
    }
}

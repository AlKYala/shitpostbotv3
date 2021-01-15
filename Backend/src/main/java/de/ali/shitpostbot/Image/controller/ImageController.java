package de.ali.shitpostbot.Image.controller;

import de.ali.shitpostbot.Image.model.Image;
import de.ali.shitpostbot.Image.service.ImageService;
import de.ali.shitpostbot.shared.controller.BaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController implements BaseController<Image, Long> {
    @Autowired
    private ImageService imageService;

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<Image> findAll() {
        return this.imageService.findAll();
    }

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}")
    public Image findById(@PathVariable Long id) {
        return this.imageService.findById(id);
    }

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public Image create(@RequestBody Image image) {
        return this.imageService.create(image);
    }

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public Long delete(@PathVariable Long id) {
        return this.imageService.deleteById(id);
    }

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{id}")
    public Image update(@RequestBody Image image, @PathVariable Long id) {
        return this.imageService.update(id, image);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/random")
    public Image findRandom() {
        return this.imageService.findRandom();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/count")
    public Long getCount() {
        return this.imageService.getCount();
    }
}

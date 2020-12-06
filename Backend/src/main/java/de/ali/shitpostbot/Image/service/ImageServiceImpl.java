package de.ali.shitpostbot.Image.service;

import de.ali.shitpostbot.Image.model.Image;
import de.ali.shitpostbot.Image.repository.ImageRepository;
import de.ali.shitpostbot.shared.exceptions.NotFoundException;
import de.ali.shitpostbot.shared.service.Validator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final Validator<Image, ImageRepository> validator;

    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
        this.validator =
                new Validator<Image, ImageRepository>("Image", this.imageRepository);

    }

    @Override
    public Image findById(Long id) {
        return this.imageRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Image with ID %d cannot be found")));
    }

    @Override
    public List<Image> findAll() {
        return this.imageRepository.findAll();
    }

    @Override
    public Long deleteById(Long id) {
        validator.checkIDNotNull(id);

    }
}

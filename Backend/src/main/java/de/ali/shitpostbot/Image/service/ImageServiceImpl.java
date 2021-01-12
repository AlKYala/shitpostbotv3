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
                new NotFoundException(String.format("Image with ID %d cannot be found", id)));
    }

    @Override
    public List<Image> findAll() {
        return this.imageRepository.findAll();
    }

    @Override
    public Long deleteById(Long id) {
        validator.checkIDNotNull(id);
        imageRepository.deleteById(id);
        validator.checkEntityNotExits(id);
        return id;
    }

    @Override
    public Image create(Image image) {
        this.validator.checkIDNotNull(image.getId());
        log.info("Image with ID {} created successfully", image.getId());
        return imageRepository.save(image);
    }

    @Override
    public Image update(Long id, Image image) {
        this.validator.checkEntityExitsts(id);
        this.validator.checkIDsAreIdentical(id, image.getId());
        log.info("Image with ID {} created successfully", image.getId());
        return imageRepository.save(image);
    }

    @Override
    public Image findRandom() {
        long maximumID = this.imageRepository.count() + 1;
        long randomID = (long) (Math.random() * maximumID);
        randomID = (randomID < 1) ? 1 : randomID;
        randomID = (randomID == maximumID) ? maximumID-1 : randomID;
        return this.imageRepository.findById(randomID).get();
    }
}

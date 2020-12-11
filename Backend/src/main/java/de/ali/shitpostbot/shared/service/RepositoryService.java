package de.ali.shitpostbot.shared.service;

import de.ali.shitpostbot.Image.repository.ImageRepository;
import de.ali.shitpostbot.Image.service.ImageService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class RepositoryService {

    private ImageRepository imageRepository;

    public RepositoryService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Long getNumberOfImages() {
        return this.imageRepository.count();
    }
}

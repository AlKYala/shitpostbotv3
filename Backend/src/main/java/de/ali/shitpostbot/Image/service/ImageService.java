package de.ali.shitpostbot.Image.service;

import de.ali.shitpostbot.Image.model.Image;
import de.ali.shitpostbot.shared.service.BaseService;

public interface ImageService extends BaseService<Image> {
    /**
     * Selects a random Image instance and returns it
     * IDs in this project and spring boot in general start at 1
     * @return a random Image instance
     */
    public Image findRandom();
}

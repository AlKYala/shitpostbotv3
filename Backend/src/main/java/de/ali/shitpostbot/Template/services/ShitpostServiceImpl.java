package de.ali.shitpostbot.Template.services;

import de.ali.shitpostbot.Image.service.ImageService;
import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.shared.service.RepositoryService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.HashSet;
import java.util.Set;

@Service
@Slf4j
@NoArgsConstructor
public class ShitpostServiceImpl implements ShitpostService {

    private RepositoryService repositoryService;
    private ImageService imageService;

    private long generateRandomNumber(long max) {
        return (long) (Math.random() * max);
    }

    @Override
    public Set<Long> findImageIDs(long n) {
        Set<Long> idSet = new HashSet<Long>();
        while(idSet.size() != n) {
            idSet.add(this.generateRandomNumber(n));
        }
        return idSet;
    }

    @Override
    public Set<de.ali.shitpostbot.Image.model.Image> findImages(Set<Long> ids) {
        Set<de.ali.shitpostbot.Image.model.Image> images = new HashSet<>();
        for(Long id: ids) {
            images.add(this.imageService.findById(id));
        }
        return images;
    }


    @Override
    public Image createShitpost(Template t) {
        Set<Long> ids = this.findImageIDs(t.getCoordinates().size());
        Set<de.ali.shitpostbot.Image.model.Image> images = this.findImages(ids);
    }
}

package de.ali.shitpostbot.Template.services;

import de.ali.shitpostbot.Coordinate.model.Coordinate;
import de.ali.shitpostbot.Image.service.ImageService;
import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.shared.service.RepositoryService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;

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
    public Image createShitpost(Template t) throws IOException {
        BufferedImage templateBackground = ImageIO.read(new URL(t.getBaseUrl()));
        BufferedImage cleanTemplate = ImageIO.read(new URL(t.getBaseUrl()));
        Set<Long> ids = this.findImageIDs(t.getCoordinates().size());
        Set<de.ali.shitpostbot.Image.model.Image> imageInstances = this.findImages(ids);
        Set<Image> images = this.getImages(imageInstances);
        Map<Image, Coordinate> imageCoordinateMap = this.mergeImageCoordinates(images , t.getCoordinates());

        for(Image i : imageCoordinateMap.keySet()) {
            this.writeOnImage(templateBackground, i, imageCoordinateMap.get(i));
        }

        //put on top
        Graphics2D templateGraphics = templateBackground.createGraphics();
        templateGraphics.drawImage(templateBackground, null, 0, 0);
        return templateBackground;
    }

    @Override
    public BufferedImage getImageFromURL(String url) throws IOException {
        URL imageUrl = new URL(url);
        return ImageIO.read(imageUrl);
    }

    @Override
    public Map<Image, Coordinate> mergeImageCoordinates(Set<Image> images, Set<Coordinate> coordinates) {
        Iterator<Image> imageIterator = images.iterator();
        Iterator<Coordinate> coordinateIterator = coordinates.iterator();
        Map<Image, Coordinate> imageMap = new HashMap<Image, Coordinate>();

        boolean hasNext = imageIterator.hasNext() && coordinateIterator.hasNext();

        while(hasNext) {
            imageMap.put(imageIterator.next(), coordinateIterator.next());
            hasNext = imageIterator.hasNext() && coordinateIterator.hasNext();
        }

        return imageMap;
    }

    @Override
    public Set<Image> getImages(Set<de.ali.shitpostbot.Image.model.Image> imageSet) throws IOException {
        Set<Image> images = new HashSet<Image>();
        for(de.ali.shitpostbot.Image.model.Image im: imageSet) {
            images.add(this.getImageFromURL(im.getUrl()));
        }
        return images;
    }

    @Override
    public void writeOnImage(BufferedImage background, Image image, Coordinate coordinate) {
        BufferedImage toPaste = this.bufferedImageFromImage(resizeImage(image,
                coordinate.getX2() - coordinate.getX1(),
                coordinate.getY2() - coordinate.getY1()));
        Graphics2D backgroundGraphics = background.createGraphics();
        backgroundGraphics.drawImage(toPaste, null, coordinate.getX1(), coordinate.getY1());
    }

    @Override
    public Image resizeImage(Image image, int width, int height) {
        return image.getScaledInstance(width, height, Image.SCALE_SMOOTH);
    }

    @Override
    public BufferedImage bufferedImageFromImage(Image img) {
        BufferedImage bi = new BufferedImage(img.getWidth(null), img.getHeight(null), BufferedImage.TYPE_INT_ARGB);
        Graphics2D biGraphics = bi.createGraphics();
        biGraphics.drawImage(img, 0, 0, null);
        return bi;
    }
}

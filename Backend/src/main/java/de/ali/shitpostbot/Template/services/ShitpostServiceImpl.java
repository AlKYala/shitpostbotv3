package de.ali.shitpostbot.Template.services;

import com.nimbusds.jose.util.Base64;
import de.ali.shitpostbot.Coordinate.model.Coordinate;
import de.ali.shitpostbot.Coordinate.repository.CoordinateRepository;
import de.ali.shitpostbot.Image.repository.ImageRepository;
import de.ali.shitpostbot.Image.service.ImageService;
import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.Template.repositories.TemplateRepository;
import de.ali.shitpostbot.shared.model.Shitpost;
import de.ali.shitpostbot.shared.service.RepositoryService;
import de.ali.shitpostbot.shared.service.Validator;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.slf4j.SLF4JLogger;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;
import java.util.List;

@Service
@Slf4j
public class ShitpostServiceImpl implements ShitpostService {

    private RepositoryService repositoryService;
    private ImageService imageService;
    private final TemplateRepository templateRepository;
    private final CoordinateRepository coordinateRepository;
    private Validator<Template, TemplateRepository> validator;

    public ShitpostServiceImpl(TemplateRepository templateRepository,
                               CoordinateRepository coordinateRepository,
                               ImageService imageService) {
        this.templateRepository = templateRepository;
        this.coordinateRepository = coordinateRepository;
        this.validator =
                new Validator<Template, TemplateRepository>("Template", this.templateRepository);
        this.imageService = imageService;
    }

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
        //debug
        log.info(String.format("Width: %d, Height: %d", coordinate.getX2() - coordinate.getX1(), coordinate.getY2() - coordinate.getY1()));
        Graphics2D backgroundGraphics = background.createGraphics();
        backgroundGraphics.drawImage(toPaste, coordinate.getX1(), coordinate.getY1(), null);
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

    /*@Override
    public BufferedImage resizeBufferedImage(BufferedImage image, int width, int height) {
        return this.bufferedImageFromImage(this.resizeImage(image, width, height));
    }*/

    /*@Override
    public BufferedImage cloneBufferedImage(BufferedImage toClone) {
        BufferedImage b = new BufferedImage(toClone.getWidth(), toClone.getHeight(), toClone.getType());
        Graphics2D gb = b.createGraphics();
        gb.drawImage(toClone, null, 0, 0);
        return b;
    }*/

    @Override
    public Shitpost generateShitpost(Template template) throws IOException {
        Set<Coordinate> coordinates = template.getCoordinates();
        BufferedImage templateImage = this.retrieveImage(new URL(template.getBaseUrl()));
        Graphics2D templateGraphics = templateImage.createGraphics();

        List<de.ali.shitpostbot.Image.model.Image> randomImages =
                new ArrayList<de.ali.shitpostbot.Image.model.Image>();

        while(randomImages.size() < coordinates.size()) {
            randomImages.add(this.imageService.findRandom());
        }
        //debug

        int imageIndex = 0;
        /*iterate through coordinates with for of because set
        get the BufferedImage from Image.url field
        Resize them according to the current coordinate
        paste them
         */
        for(Coordinate c: coordinates) {
            BufferedImage tempImage = this.retrieveImage(new URL(randomImages.get(imageIndex).getUrl()));
            this.writeOnImage(templateImage, tempImage, c);
            imageIndex++;
        }
        BufferedImage uneditedTemplate = this.retrieveImage(new URL(template.getBaseUrl()));
        templateGraphics.drawImage(uneditedTemplate, 0, 0,null);
        Shitpost s = new Shitpost();
        s.setBase64(this.bufferedImageToBase64(templateImage));
        s.setBaseTemplate(template);
        return s;
    }

    @Override
    public Shitpost generateShitpost(Long id) throws IOException {
        return this.generateShitpost(this.templateRepository.findById(id).get());
    }

    @Override
    public int[] findResizeSize(Coordinate coordinate) {
        return new int[] {coordinate.getX2()-coordinate.getX1(), coordinate.getY2(), coordinate.getY1()};
    }

    @Override
    public BufferedImage retrieveImage(URL url) throws IOException {
        return ImageIO.read(url);
    }

    @Override
    //https://stackoverflow.com/questions/6377608/in-java-is-it-possible-to-convert-a-bufferedimage-to-an-img-data-uri
    public String bufferedImageToBase64(BufferedImage image) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        ImageIO.write(image, "PNG", out);
        byte[] bytes = out.toByteArray();
        return String.format("data:image/png;base64,%s", Base64.encode(bytes).toString());
    }
}

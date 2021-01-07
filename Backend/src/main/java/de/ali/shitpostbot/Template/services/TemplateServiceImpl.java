package de.ali.shitpostbot.Template.services;

import com.nimbusds.jose.util.Base64;
import de.ali.shitpostbot.Coordinate.model.Coordinate;
import de.ali.shitpostbot.Coordinate.repository.CoordinateRepository;
import de.ali.shitpostbot.Image.repository.ImageRepository;
import de.ali.shitpostbot.Image.service.ImageService;
import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.Template.repositories.TemplateRepository;
import de.ali.shitpostbot.shared.exceptions.NotFoundException;
import de.ali.shitpostbot.shared.exceptions.NotSavedException;
import de.ali.shitpostbot.shared.model.DrawnTemplate;
import de.ali.shitpostbot.shared.model.Shitpost;
import de.ali.shitpostbot.shared.service.Validator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.Buffer;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
public class TemplateServiceImpl implements TemplateService {

    private final TemplateRepository templateRepository;
    private final CoordinateRepository coordinateRepository;
    private Validator<Template, TemplateRepository> validator;
    private final ImageRepository imageRepository;

    public TemplateServiceImpl(TemplateRepository templateRepository,
                               CoordinateRepository coordinateRepository,
                               ImageRepository imageRepository) {
        this.templateRepository = templateRepository;
        this.coordinateRepository = coordinateRepository;
        this.validator =
                new Validator<Template, TemplateRepository>("Template", this.templateRepository);
        this.imageRepository = imageRepository;
    }

    @Override
    public Template findById(Long id) {
        return this.templateRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException(String.format("Template with ID %d not found", id)));
    }

    @Override
    public List<Template> findAll() {
        return this.templateRepository.findAll();
    }

    @Override
    public Long deleteById(Long id) {
        this.validator.checkIDNotNull(id);
        Template currentTemplate = this.templateRepository.findById(id).get();
        currentTemplate.getCoordinates().forEach(
                coordinate -> this.coordinateRepository.deleteById(coordinate.getId())
        );
        this.templateRepository.deleteById(id);
        log.info("Template with ID {} deleted successfully", id);
        return id;
    }

    @Override
    public Template create(Template template) {
        this.validator.checkIDNotNull(template.getId());
        this.checkFieldsValid(template);
        log.info("{Template with ID {} saved successfully}", template.getId());
        return this.templateRepository.save(template);
    }

    @Override
    public Template update(Long id, Template template) {
        this.validator.checkIDsAreIdentical(id, template.getId());
        this.checkFieldsValid(template);
        Template oldTemplate = this.templateRepository.findById(id).get();
        template.setCoordinates(oldTemplate.getCoordinates());
        log.info("Template with ID {} updated successfully", id);
        return this.templateRepository.save(template);
    }

    @Override
    public boolean hasCoordinate(Template template) {
        return !template.getCoordinates().isEmpty();
    }

    @Override
    public void checkFieldsValid(Template template) {
        /* hochgeladene templates haben keine koordinaten -
        die werden erst danach hochgeladen!
        if(!hasCoordinate(template)) {
            throw new NotSavedException("The passed Template needs a coordinate");
        }*/
        if(template.getBaseUrl() == null || template.getBaseUrl().isBlank()) {
            throw new NotSavedException("The passed Template needs a base URL");
        }
    }

    @Override
    public String drawCoordinates(Template template) throws IOException {
        Set<Coordinate> coordinates = template.getCoordinates();
        URL templateURL = new URL(template.getBaseUrl());
        BufferedImage image = this.retrieveImage(templateURL);
        for(Coordinate c: coordinates) {
            int[] areas = new int[] {c.getX1(), c.getX2(), c.getY1(), c.getY2()};
            this.drawRectangle(image, areas, 2);
        }
        return this.bufferedImageToBase64(image);
    }

    @Override
    public void drawRectangle(BufferedImage templateImage, int[] coordinates, int thickness) {
        Graphics2D imageGraphics = templateImage.createGraphics();
        BasicStroke b = new BasicStroke(thickness);
        imageGraphics.setColor(Color.GREEN);
        imageGraphics.setStroke(b);
        //vertical lines:
        //left
        imageGraphics.drawLine(coordinates[0], coordinates[2], coordinates[0], coordinates[3]);
        //right
        imageGraphics.drawLine(coordinates[1], coordinates[2], coordinates[1], coordinates[3]);
        //horizontal lines
        //upper
        imageGraphics.drawLine(coordinates[0], coordinates[2], coordinates[1], coordinates[2]);
        //lower
        imageGraphics.drawLine(coordinates[0], coordinates[3], coordinates[1], coordinates[3]);
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

    @Override
    public Shitpost generateShitpost(Template template) throws IOException {
        Set<Coordinate> coordinates = template.getCoordinates();
        BufferedImage templateImage = this.retrieveImage(new URL(template.getBaseUrl()));
        Graphics2D templateGraphics = templateImage.createGraphics();

        long maximumImageID = this.imageRepository.count(); //IDs here start at 1
        List<de.ali.shitpostbot.Image.model.Image> randomImages =
                new ArrayList<de.ali.shitpostbot.Image.model.Image>();

        while(randomImages.size() < coordinates.size()) {
            long randomID = (long) ((Math.random()) * maximumImageID);
            randomID = (randomID < 1) ? 1 : randomID;
            randomImages.add(this.imageRepository.findById(randomID).get());
            //debug
            log.info(Long.toString(randomID));
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
            int[] dimensions = this.findResizeSize(c);
            BufferedImage tempImageScaled = this.imageToBufferedImage(
                    tempImage.getScaledInstance(dimensions[0], dimensions[1], 0));
            templateGraphics.drawImage(tempImageScaled, null, c.getX1(), c.getY1());
            imageIndex++;
        }
        BufferedImage uneditedTemplate = this.retrieveImage(new URL(template.getBaseUrl()));
        templateGraphics.drawImage(uneditedTemplate, 0, 0,null);
        Shitpost s = new Shitpost();
        s.setBase64(this.bufferedImageToBase64(templateImage));
        return s;
    }

    @Override
    public Shitpost generateShitpost(Long id) throws IOException {
        return this.generateShitpost(this.findById(id));
    }

    @Override
    public int[] findResizeSize(Coordinate coordinate) {
        return new int[] {coordinate.getX2()-coordinate.getX1(), coordinate.getY2(), coordinate.getY1()};
    }

    @Override
    public BufferedImage imageToBufferedImage(Image image) {
        BufferedImage b = new BufferedImage(image.getWidth(null),
                image.getHeight(null),
                BufferedImage.TYPE_INT_ARGB);
        Graphics2D bGraphics = b.createGraphics();
        bGraphics.drawImage(image, 0, 0, null);
        bGraphics.dispose();
        return b;
    }
}

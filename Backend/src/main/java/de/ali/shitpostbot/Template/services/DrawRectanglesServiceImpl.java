package de.ali.shitpostbot.Template.services;

import de.ali.shitpostbot.Coordinate.model.Coordinate;
import de.ali.shitpostbot.Template.model.Template;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Set;

@Service
@Slf4j
public class DrawRectanglesServiceImpl implements DrawRectanglesService {

    @Override
    public BufferedImage retrieveImage(URL url) throws IOException {
        return ImageIO.read(url);
    }

    @Override
    public BufferedImage enterRectangles(BufferedImage image, Set<Coordinate> coordinates) {
        Graphics2D g2d = image.createGraphics();
        BasicStroke bs = new BasicStroke(9);
        g2d.setColor(Color.GREEN);
        g2d.setStroke(bs);

        for(Coordinate coordinate: coordinates) {
            int[] lineCoordinates = new int[]
                    {coordinate.getX1(), coordinate.getX2(), coordinate.getY1(), coordinate.getY2()};
            //vertical lines
            g2d.drawLine(lineCoordinates[0], lineCoordinates[2], lineCoordinates[0], lineCoordinates[3]);
            g2d.drawLine(lineCoordinates[1], lineCoordinates[2], lineCoordinates[1], lineCoordinates[3]);
            //horizontal lines
            g2d.drawLine(lineCoordinates[0], lineCoordinates[2], lineCoordinates[1], lineCoordinates[2]);
            g2d.drawLine(lineCoordinates[0], lineCoordinates[3], lineCoordinates[1], lineCoordinates[3]);
        }

        return image;
    }

    @Override
    public Image drawRectanglesAroundCoordinates(Template template) throws MalformedURLException, IOException {
        URL templateBaseUrl= new URL(template.getBaseUrl());
        BufferedImage baseUrlImage = this.retrieveImage(templateBaseUrl);
        return this.enterRectangles(baseUrlImage, template.getCoordinates());
    }

}

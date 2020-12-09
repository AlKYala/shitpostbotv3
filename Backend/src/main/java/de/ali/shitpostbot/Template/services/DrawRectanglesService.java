package de.ali.shitpostbot.Template.services;

import de.ali.shitpostbot.Coordinate.model.Coordinate;
import de.ali.shitpostbot.Template.model.Template;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Set;

/**
 * The idea behind this service is:
 * It draws rectangles around the coordinates
 * It goes like this
 * 1. retrieve image
 * 2. draw rectangles
 *
 * CAREFUL: Image class here: java.awt.Image
 *
 * Open for discussion: How to persist image with drawn rectangles?
 * In database with base64? Not at all?
 */

public interface DrawRectanglesService {

    /**
     * Takes a template object
     * Retrieves the image using retrieveImage(URL url) method
     * Draws rectangles using enterRectangles(Image image) method
     * @param template The template to use
     * @return The image of the base url with rectanlges around it
     */
    public Image drawRectanglesAroundCoordinates(Template template) throws MalformedURLException, IOException;

    public BufferedImage retrieveImage(URL url) throws IOException;
    public BufferedImage enterRectangles(BufferedImage image, Set<Coordinate> coordinates);
}

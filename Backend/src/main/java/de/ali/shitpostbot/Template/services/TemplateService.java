package de.ali.shitpostbot.Template.services;

import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.shared.service.BaseService;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

public interface TemplateService extends BaseService<Template> {
    boolean hasCoordinate(Template template);

    /**
     * Checks if the passed template has Coordinates
     * and a base URL
     * @param template the passed template argument
     */
    public void checkFieldsValid(Template template);

    /**
     * A method to draw the lines of coordinate on an image object
     * @param template
     */
    public void drawCoordinates(Template template) throws IOException;

    /**
     * Draws lines on an image Object along the specified areas - uses side effects
     * @param template a BufferedImage instance of the image from the templates URL
     * @param area the coordinates to draw the rectangle with - the coordinates are:
     *              area[0] : x1 left
     *              area[1] : x2 right
     *              area[2] : y1 top
     *              area[3] : y2 bottom
     * @param thickness brush thickness
     */
    public void drawRectangle(BufferedImage template, int[] area, int thickness);

    public BufferedImage retrieveImage(URL url) throws IOException;
}

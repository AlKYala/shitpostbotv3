package de.ali.shitpostbot.Template.services;

import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.shared.service.BaseService;

import java.awt.image.BufferedImage;
import java.io.IOException;
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
     * @return A base64 representation of the template image with rectangles around the coordinates
     */
    public String drawCoordinates(Template template) throws IOException;

    /**
     * Draws lines on an image Object along the specified areas
     * @param template a BufferedImage instance of the image from the templates URL
     * @param area the coordinates to draw the rectangle with - the coordinates are:
     *              area[0] : x1 left
     *              area[1] : x2 right
     *              area[2] : y1 top
     *              area[3] : y2 bottom
     * @param thickness brush thickness
     * @return A base64 representation of the template image with rectangles around the coordinates
     */
    public void drawRectangle(BufferedImage template, int[] area, int thickness);

    /**
     * Creates a BufferedImage instnance from the URL Object given
     * @param url the URL object with an url to an image
     * @return The image from the url as BufferedImage instance
     * @throws IOException
     */
    public BufferedImage retrieveImage(URL url) throws IOException;

    /**
     * Returns a base 64 string representing a BufferedImage
     * @param image the BufferedImage instance to represent in Base64
     * @return A base64 String that represents the passed BufferedImage instance
     */
    public String bufferedImageToBase64(BufferedImage image) throws IOException;
}

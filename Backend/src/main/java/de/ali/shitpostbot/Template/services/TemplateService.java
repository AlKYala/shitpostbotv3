package de.ali.shitpostbot.Template.services;

import de.ali.shitpostbot.Coordinate.model.Coordinate;
import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.shared.model.DrawnTemplate;
import de.ali.shitpostbot.shared.model.Shitpost;
import de.ali.shitpostbot.shared.service.BaseService;

import java.awt.*;
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

    /**
     * Takes a coordinate object and returns the sizes to resize it with
     * @param coordinate The coordinate to resize an image for
     * @return An array of 2 with {width, height}
     */
    public int[] findResizeSize(Coordinate coordinate);

    /**
     * https://stackoverflow.com/questions/10391778/create-a-bufferedimage-from-file-and-make-it-type-int-argb
     * Takes an image instance returns it as BufferedImage
     * @param image The image to make a bufferedInstance of
     * @return A bufferedImage instance of the image
     */
    public BufferedImage imageToBufferedImage(Image image);

    /**
     * @return The number of images persisted in the database
     */
    public Long getCount();
}

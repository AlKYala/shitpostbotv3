package de.ali.shitpostbot.Template.services;

import de.ali.shitpostbot.Coordinate.model.Coordinate;
import de.ali.shitpostbot.Template.model.Template;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Map;
import java.util.Set;

public interface ShitpostService {
    /**
     * n:= the number of Images a template holds. Determined by
     * the number of coordinate Objects of the template object
     * @param n The number of IDs to find
     * @return A set of distinct IDs for images
     */
    public Set<Long> findImageIDs(long n);

    /**
     * Returns a Set of Image objects based on the Integers in the passed
     * parameter that has all the ids
     * @param ids The Set of IDs
     * @return A Set of Image objects
     */
    public Set<de.ali.shitpostbot.Image.model.Image> findImages(Set<Long> ids);

    /**
     * Creates a shitpost. Idea:
     * Bottom Layer: Template
     * On Top: Images resized accroding to the template
     * On Top: The template again
     * @param t The template
     * @return a java.awt.Image object with the complete shitpost
     */
    public Image createShitpost(Template t);

    /**
     * Retrieves Image from URL
     * @param url the url as String
     * @return the java.awt.Image instance
     */
    public BufferedImage getImageFromURL(String url) throws IOException;

    /**
     * Maps java.awt.Image to Coordinate Instances
     * @param images Images to map to a coordinate each
     * @param coordinates coordinate to map to an image
     * @return a Map where images are mapped to coordinates
     */
    public Map<Image, Coordinate> mergeImageCoordinates(Set<Image> images, Set<Coordinate> coordinates);
}

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
    public Image createShitpost(Template t) throws IOException;

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

    /**
     * Takes a set imageSet of de.ali.shitpostbot.Image.model.Image Objects and returns
     * a set of java.awt.Image instances according to the link of the images in imageSet
     * @param imageSet Set imageSet of de.ali.shitpostbot.Image.model.Image Objects
     * @return a set of java.awt.Image instances
     */
    public Set<Image> getImages(Set<de.ali.shitpostbot.Image.model.Image> imageSet) throws IOException;

    /**
     * Takes an image, resizes it according to the coordinate given and places it on the background according
     * to coordinate
     * Uses side effect
     * @param background The background to paste the image on
     * @param image The image to paste on the background
     * @param coordinate The coordinate to place the image on
     */
    public void writeOnImage(BufferedImage background, Image image, Coordinate coordinate);

    /**
     * Creates resized images of images
     * @param image The image to copy
     * @param height The new height
     * @param width The new width
     * @return A cloned instance of the passed image but resized
     */
    public Image resizeImage(Image image, int height, int width);
}

package de.ali.shitpostbot.Template.services;

import de.ali.shitpostbot.Template.model.Template;

import java.awt.*;
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
}

package de.ali.shitpostbot.Template.services;

import de.ali.shitpostbot.Template.model.Template;

import java.awt.*;
import java.util.Set;

public interface ShitpostService {
    /**
     * n:= the number of Images a template holds. Determined by
     * the number of coordinate Objects of the template object
     * @param n The number of IDs to find
     * @return A set of distinct IDs for images to post in array
     * acts like a tuple of form (int id, int coordinateIndex)
     */
    public Set<int[]> findImageIDs(int n);

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

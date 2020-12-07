package de.ali.shitpostbot.Template.services;

import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.shared.service.BaseService;

public interface TemplateService extends BaseService<Template> {
    boolean hasCoordinate(Template template);

    /**
     * Checks if the passed template has Coordinates
     * and a base URL
     * @param template the passed template argument
     */
    public void checkFieldsValid(Template template);
}

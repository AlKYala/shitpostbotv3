package de.ali.shitpostbot.User.service;

import de.ali.shitpostbot.Image.model.Image;
import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.User.model.User;
import de.ali.shitpostbot.shared.service.BaseService;

import java.util.Set;

public interface UserService extends BaseService<User> {

    User findByUsername(String username);

    void checkUserNameValid(String username);

    void checkPasswordValid(String password);

    void checkCredentialsValid(User user);

    Set<Template> getTemplatesByUserId(Long id);

    Set<Image> getImagesByUserId(Long id);
}

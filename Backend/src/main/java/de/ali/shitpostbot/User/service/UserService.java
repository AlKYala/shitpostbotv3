package de.ali.shitpostbot.User.service;

import de.ali.shitpostbot.User.model.User;
import de.ali.shitpostbot.shared.service.BaseService;

public interface UserService extends BaseService<User> {

    User findByUsername(String username);

    void checkUserNameValid(String username);

    void checkPasswordValid(String password);

    void checkCredentialsValid(User user);
}

package de.ali.shitpostbot.User.service;

import de.ali.shitpostbot.Image.model.Image;
import de.ali.shitpostbot.Image.service.ImageService;
import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.Template.services.TemplateService;
import de.ali.shitpostbot.User.model.User;
import de.ali.shitpostbot.User.repository.UserRepository;
import de.ali.shitpostbot.shared.exceptions.MalformedCredentialsException;
import de.ali.shitpostbot.shared.exceptions.NotFoundException;
import de.ali.shitpostbot.shared.exceptions.NotSavedException;
import de.ali.shitpostbot.shared.service.Validator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final Validator<User, UserRepository> validator;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final ImageService imageService;
    private final TemplateService templateService;

    public UserServiceImpl(UserRepository userRepository,
                           ImageService imageService,
                           TemplateService templateService) {
        this.userRepository = userRepository;
        this.imageService = imageService;
        this.templateService = templateService;
        this.validator = new Validator<User, UserRepository>("User", this.userRepository);
    }

    @Override
    public User findById(Long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException(String.format("User with ID %d not found", id)));
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findByUsername(String username) {
        for(User user : this.userRepository.findAll()) {
            if(user.getUsername().equals(username)) {
                return user;
            }
        }
        log.info("User with Username {} not found", username);
        throw new NotFoundException(String.format("User with username %s not found", username));
    }

    /**
     * Also deletes all related posts
     * @param id the id of the instance to delete
     * @return the id of the deleted user
     */
    @Override
    public Long deleteById(Long id) {
        this.validator.checkIDNotNull(id);
        User user = this.userRepository.findById(id).get();
        user.getPostedImages().forEach(image -> this.imageService.deleteById(image.getId()));
        user.getPostedTemplates().forEach(template -> this.templateService.deleteById(template.getId()));
        userRepository.deleteById(id);
        validator.checkEntityNotExits(id);
        return id;
    }

    @Override
    public void checkUserNameValid(String username) {
        if(username == null || username.isBlank()) {
            log.error("Please enter a valid Username", new NotSavedException());
        }
    }

    @Override
    public void checkPasswordValid(String password) {
        if(password.length() < 8) {
            log.error("Password is too short. 8 Characters minimum needed", new MalformedCredentialsException());
        }
    }

    @Override
    public void checkCredentialsValid(User user) {
        this.checkUserNameValid(user.getUsername());
        this.checkPasswordValid(user.getPassword());
    }

    @Override
    public User create(User user) {
        this.checkCredentialsValid(user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        log.info("User with username {} and Id {} created", user.getUsername(), user.getId());
        return userRepository.save(user);
    }

    @Override
    public User update(Long id, User user) {
        this.validator.checkEntityExitsts(id);
        this.checkCredentialsValid(user);
        this.validator.checkIDsAreIdentical(id, user.getId());
        User currentUser = this.userRepository.findById(id).get();
        user.setPostedImages(user.getPostedImages());
        user.setPostedTemplates(user.getPostedTemplates());
        log.info("User {} with ID {} updated", user.getUsername(), user.getId());
        return userRepository.save(user);
    }

    @Override
    public Set<Image> getImagesByUserId(Long id) {
        return this.imageService.findAll()
                .stream()
                .filter(image -> image.getPoster().getId() == id)
                .collect(Collectors.toSet());
    }

    @Override
    public Set<Template> getTemplatesByUserId(Long id) {
        return this.templateService.findAll()
                .stream()
                .filter(template -> template.getId() == id)
                .collect(Collectors.toSet());
    }
}

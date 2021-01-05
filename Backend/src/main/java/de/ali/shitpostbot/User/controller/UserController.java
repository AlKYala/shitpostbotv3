package de.ali.shitpostbot.User.controller;

import de.ali.shitpostbot.Image.model.Image;
import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.User.model.User;
import de.ali.shitpostbot.User.service.UserService;
import de.ali.shitpostbot.shared.controller.BaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController implements BaseController<User, Long> {

    @Autowired
    private UserService userService;

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<User> findAll() {
        return this.userService.findAll();
    }

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}")
    public User findById(@PathVariable Long id) {
        return this.userService.findById(id);
    }

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public User create(@RequestBody User user) {
        return this.userService.create(user);
    }

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public Long delete(@PathVariable Long id) {
        return this.userService.deleteById(id);
    }

    @Override
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{id}")
    public User update(@RequestBody User user, @PathVariable Long id) {
        return this.userService.update(id, user);
    }

    /**
     * Returns all Images posted by a user with passed id
     * @param id The id of the user
     * @return All images found with the users id as posters member
     */
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}/images")
    public Set<Image> getImages(@PathVariable Long id) {
        return this.userService.getImagesByUserId(id);
    }

    /**
     * Returns all Templates posted by a user with passed id
     * @param id The id of the user
     * @return All images found with the users id as posters member
     */
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}/templates")
    public Set<Template> getTemplates(@PathVariable Long id) {
        return this.userService.getTemplatesByUserId(id);
    }
}

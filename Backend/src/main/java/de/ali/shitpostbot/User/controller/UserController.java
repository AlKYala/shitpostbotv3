package de.ali.shitpostbot.User.controller;

import de.ali.shitpostbot.User.model.User;
import de.ali.shitpostbot.User.service.UserService;
import de.ali.shitpostbot.shared.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class UserController implements BaseController<User, Long> {

    @Autowired
    private UserService userService;

    @Override
    @GetMapping
    public List<User> findAll() {
        return this.userService.findAll();
    }

    @Override
    @GetMapping("/{id}")
    public User findById(@PathVariable Long id) {
        return this.userService.findById(id);
    }

    @Override
    @PostMapping("/register")
    public User create(@RequestBody User user) {
        return this.userService.create(user);
    }

    @Override
    @DeleteMapping("/{id}")
    public Long delete(@PathVariable Long id) {
        return this.userService.deleteById(id);
    }

    @Override
    @PutMapping("/{id}")
    public User update(@RequestBody User user, @PathVariable Long id) {
        return this.userService.update(id, user);
    }
}

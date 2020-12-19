package de.ali.shitpostbot.User.controller;

import de.ali.shitpostbot.User.model.User;
import de.ali.shitpostbot.User.service.UserService;
import de.ali.shitpostbot.shared.controller.BaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}

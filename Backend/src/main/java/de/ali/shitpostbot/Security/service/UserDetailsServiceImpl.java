package de.ali.shitpostbot.Security.service;

import de.ali.shitpostbot.User.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;

import java.util.Collections;
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private final UserService userService;

    /**
     * Two classes for user used here:
     * de.ali.shitpostbot.User.model.User
     * org.springframework.security.core.userdetails.User
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        de.ali.shitpostbot.User.model.User user = this.userService.findByUsername(email);
        return new User(user.getUsername(), user.getPassword(), Collections.emptyList());
    }
}

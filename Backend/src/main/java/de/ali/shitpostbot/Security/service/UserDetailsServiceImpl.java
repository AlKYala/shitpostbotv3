package de.ali.shitpostbot.Security.service;

import de.ali.shitpostbot.User.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collections;



@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private final UserService userService;

    @Override
    /**
     * Two classes for user used here:
     * de.ali.shitpostbot.User.model.User
     * org.springframework.security.core.userdetails.User
     */
    public UserDetails loadUserByUsername(String username) {
        de.ali.shitpostbot.User.model.User user = this.userService.findByUsername(username);
        return new org.springframework.security.core.userdetails.User
                (user.getUsername(), user.getPassword(), Collections.EMPTY_LIST);
    }

}

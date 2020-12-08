package de.ali.shitpostbot.Security.controller;

import de.ali.shitpostbot.Security.model.AuthenticationRequest;
import de.ali.shitpostbot.Security.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static de.ali.shitpostbot.Security.SecurityConstants.SIGN_UP_ENDPOINT;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping(SIGN_UP_ENDPOINT)
    public ResponseEntity<?> createAuthentactionToken
            (@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        return this.loginService.createAuthenticationToken(authenticationRequest);
    }
}

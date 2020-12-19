package de.ali.shitpostbot.Security.controller;

import de.ali.shitpostbot.Security.model.AuthenticationRequest;
import de.ali.shitpostbot.Security.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static de.ali.shitpostbot.Security.SecurityConstants.SIGN_UP_ENDPOINT;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    /**
     * checks if email and password match by first authenticating token
     * then looking up email in database and see if the given password is correct
     * sends an ok if data is verified
     *
     * @param authenticationRequest The user credentials posted in the login request
     * @return A ResponseEntity instance for T: ok if data is verified
     * @throws Exception Thrown when user credentials are incorrect
     */
    @PostMapping(SIGN_UP_ENDPOINT)
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        return this.loginService.createAuthenticationToken(authenticationRequest);
    }

}
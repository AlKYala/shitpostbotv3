package de.ali.shitpostbot.Security.service;

import de.ali.shitpostbot.User.model.User;
import de.ali.shitpostbot.User.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import static de.ali.shitpostbot.Security.SecurityConstants.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtUtil {

    @Autowired
    private UserService userService;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * JWTokens in this application have claims for the issue date, the expiration date and
     * the signature algorithm (see create Token). This method is used to extract the claims
     * in the JWToken
     *
     * @param token          JWToken as String generated when logging in
     * @param claimsResolver used to resolve the claims in the JWT Token
     * @param <T>            Class of the token
     * @return Depending on what claim is resolved it returns a String for username/email or expiration date
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Generates JWToken based on the passed UserDetails instance userDetails
     * Calls createToken(..) to generate claims
     *
     * @param userDetails Passed on by WebSecurity Config
     * @return JWT for a user as a string
     */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        User user = this.userService.findByUsername(userDetails.getUsername());
        claims.put("id", user.getId());
        claims.put("isAdmin", user.isAdmin());
        claims.put("isBanned", user.isBanned());
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SIGNATURE_ALGORITHM, SECRET_KEY).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
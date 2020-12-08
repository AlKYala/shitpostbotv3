package de.ali.shitpostbot.Security;

import io.jsonwebtoken.SignatureAlgorithm;

public class SecurityConstants {
    public static final String SECRET_KEY = "&SOLVABLE?)_IN:_!!NON-D\"ETERMINISTC POLYNoMiAlTiMe!&$&)(?";
    public static final long EXPIRATION_TIME = 8000 * 60 * 60 * 10;
    public static final String TOKEN_PREFIX = "Bearer";
    public static final String SIGN_UP_ENDPOINT = "/authenticate";
    public static final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;
}

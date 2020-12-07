package de.ali.shitpostbot.shared.exceptions;

public class MalformedCredentialsException extends ShitPostBotException {
    public MalformedCredentialsException(String message) {
        super(message);
    }

    public MalformedCredentialsException() {
        super();
    }
}

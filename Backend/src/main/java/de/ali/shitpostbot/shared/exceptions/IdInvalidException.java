package de.ali.shitpostbot.shared.exceptions;

public class IdInvalidException extends ShitPostBotException {
    public IdInvalidException(String message) {
        super(message);
    }

    public IdInvalidException() {
        super();
    }
}

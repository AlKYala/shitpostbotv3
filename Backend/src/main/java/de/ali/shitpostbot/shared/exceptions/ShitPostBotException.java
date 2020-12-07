package de.ali.shitpostbot.shared.exceptions;

public abstract class ShitPostBotException extends RuntimeException {
    public ShitPostBotException(String message) {
        super(message);
    }

    public ShitPostBotException() {
        super();
    }
}

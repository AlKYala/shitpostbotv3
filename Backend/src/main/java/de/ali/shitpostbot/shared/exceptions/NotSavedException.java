package de.ali.shitpostbot.shared.exceptions;

public class NotSavedException extends ShitPostBotException {
    public NotSavedException() {
        super();
    }

    public NotSavedException(String message) {
        super(message);
    }
}

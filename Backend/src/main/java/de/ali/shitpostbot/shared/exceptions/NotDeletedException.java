package de.ali.shitpostbot.shared.exceptions;

public class NotDeletedException extends ShitPostBotException {
    public NotDeletedException(String message) {
        super(message);
    }

    public NotDeletedException() {
        super();
    }
}

package de.ali.shitpostbot.shared.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
/**
 * This class is not an entity
 * It is used to wrap base64 representations of templates with squares drawn in a class
 */
public class DrawnTemplate {
    private String base64Representation;
}

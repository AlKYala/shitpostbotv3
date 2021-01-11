package de.ali.shitpostbot.shared.model;

import de.ali.shitpostbot.Template.model.Template;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
/**
 * See DrawnTemplate - this class is not an entity
 * this class is used to wrap base64 Representation strings in an object
 */
public class Shitpost {
    private String base64;
    private Template baseTemplate;
}

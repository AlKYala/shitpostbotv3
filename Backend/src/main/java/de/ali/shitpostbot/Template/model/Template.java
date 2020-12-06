/*
Zur diskussion steht:
Willst du die preview bilder uebernehmen im base64 format?
Willst du nur Koordinaten uebernehmen und draufzeichen?
-> Mit verlinkung zum originalen bild?
 */

package de.ali.shitpostbot.Template.model;

import de.ali.shitpostbot.shared.model.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Template extends BaseEntity {
    /**
     * Das originale Bild
     */
    private String baseUrl;

}

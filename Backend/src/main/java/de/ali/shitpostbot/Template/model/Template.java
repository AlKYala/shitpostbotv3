/*
Zur diskussion steht:
Willst du die preview bilder uebernehmen im base64 format?
Willst du nur Koordinaten uebernehmen und draufzeichen?
Draufzeichnen erfolgt via Java.
-> Mit verlinkung zum originalen bild?
 */

package de.ali.shitpostbot.Template.model;

import de.ali.shitpostbot.Coordinate.model.Coordinate;
import de.ali.shitpostbot.shared.model.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Template extends BaseEntity {
    /**
     * Das originale Bild
     */
    private String baseUrl;

    /**
     * Da wo andere Bilder eingefügt werden
     */
    @JsonIgnore
    @OneToMany(mappedBy="reference", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Coordinate> coordinates;
}

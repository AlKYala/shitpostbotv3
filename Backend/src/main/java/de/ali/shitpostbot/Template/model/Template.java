/*
Zur diskussion steht:
Willst du die preview bilder uebernehmen im base64 format?
Willst du nur Koordinaten uebernehmen und draufzeichen?
Draufzeichnen erfolgt via Java.
-> Mit verlinkung zum originalen bild?
 */

package de.ali.shitpostbot.Template.model;

import de.ali.shitpostbot.Coordinate.model.Coordinate;
import de.ali.shitpostbot.User.model.User;
import de.ali.shitpostbot.shared.model.BaseEntity;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
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

    @ManyToOne
    @JoinColumn(nullable = false)
    @EqualsAndHashCode.Exclude
    private User poster;
}

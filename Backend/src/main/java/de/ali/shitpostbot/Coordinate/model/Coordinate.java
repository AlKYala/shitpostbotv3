package de.ali.shitpostbot.Coordinate.model;

import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.shared.model.BaseEntity;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

/**
 * Ideen zur Handhabung von Koordinaten
 * Stehen in N:1 Relation zu Templates
 * Sollen einem Template Koordinaten hinzugefügt oder entfernt werden, so geschieht
 * dies im Frontend
 * Dann werden da auch die Previews nochmal geladen
 *
 * Koordinaten werden genutzt, um Kasten um bereiche zu malen wo die crops stattfinden
 */

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Coordinate extends BaseEntity implements Serializable {

    @ManyToOne
    @JoinColumn
    @EqualsAndHashCode.Exclude
    private Template reference;

    /**
     * Koordinate LINKS
     */
    private int x1;
    /**
     * Koordinate RECHTS
     */
    private int x2;
    /**
     * Koordinate OBEN
     */
    private int y1;
    /**
     * Koordinate UNTEN
     */
    private int y2;


}

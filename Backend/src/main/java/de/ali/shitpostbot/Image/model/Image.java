package de.ali.shitpostbot.Image.model;

import de.ali.shitpostbot.User.model.User;
import de.ali.shitpostbot.shared.model.BaseEntity;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Image extends BaseEntity implements Serializable {
    private String url;

    @ManyToOne
    @JoinColumn(nullable = false)
    @EqualsAndHashCode.Exclude
    private User poster;
}
package de.ali.shitpostbot.User.model;

import com.sun.istack.NotNull;
import de.ali.shitpostbot.Image.model.Image;
import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.shared.model.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.stereotype.Component;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Set;

/**
 * We dont use emails in shitpostbot
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@Component
public class User extends BaseEntity {
    @NotNull
    @Column(unique = true)
    private String username;

    @NotNull
    private String password;

    private boolean isAdmin;

    private boolean isBanned;

    @OneToMany(mappedBy = "poster", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Image> postedImages;


    @OneToMany(mappedBy = "poster")
    @JsonIgnore
    private Set<Template> postedTemplates;
}

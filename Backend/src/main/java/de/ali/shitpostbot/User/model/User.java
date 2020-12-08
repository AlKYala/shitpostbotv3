package de.ali.shitpostbot.User.model;

import com.sun.istack.NotNull;
import de.ali.shitpostbot.Image.model.Image;
import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.shared.model.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;
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

    @JsonIgnore
    @OneToMany(mappedBy = "poster", cascade = CascadeType.ALL)
    private Set<Image> postedImages;

    @JsonIgnore
    @OneToMany(mappedBy = "poster")
    private Set<Template> postedTemplates;
}

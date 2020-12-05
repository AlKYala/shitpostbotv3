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

    private String baseUrl;

}

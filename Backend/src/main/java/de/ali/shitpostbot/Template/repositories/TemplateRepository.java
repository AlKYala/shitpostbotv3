package de.ali.shitpostbot.Template.repositories;

import de.ali.shitpostbot.Template.model.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {
}

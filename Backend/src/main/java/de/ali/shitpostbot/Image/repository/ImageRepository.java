package de.ali.shitpostbot.Image.repository;

import de.ali.shitpostbot.Image.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
}

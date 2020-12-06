package de.ali.shitpostbot.Coordinate.repository;

import de.ali.shitpostbot.Coordinate.model.Coordinate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordinateRepository extends JpaRepository<Coordinate, Long> {
}

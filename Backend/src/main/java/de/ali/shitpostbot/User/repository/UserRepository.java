package de.ali.shitpostbot.User.repository;

import de.ali.shitpostbot.User.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

package de.ali.shitpostbot.shared.service;


import de.ali.shitpostbot.shared.exceptions.IdInvalidException;
import de.ali.shitpostbot.shared.exceptions.NotDeletedException;
import de.ali.shitpostbot.shared.exceptions.NotFoundException;
import de.ali.shitpostbot.shared.model.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;

@Slf4j
@Setter
@Getter
/**
 * E is the entity class
 * T is the Repository for class T
 */
public class Validator<E extends BaseEntity, T extends JpaRepository> {

    private String entityName;
    private T repository;

    public Validator(String entityName, T repository) {
        this.entityName = entityName;
        this.repository = repository;
    }

    public void checkIDNotNull(Long id) {
        if(id == null) {
            log.info("IDs cannot be null!");
            throw new IdInvalidException("IDs cannot be null!");
        }
    }

    /**
     * Called after deletions to check if still exists
     * @param id The id of the deleted instance
     */
    public void checkEntityNotExits(Long id) {
        if(this.repository.existsById(id)) {
            log.info("Entity of class {} and id {} still exists in Database. " +
                    "Please Contact Support.", this.entityName, id);
            throw new NotDeletedException(String.format("Entity of class %s and id %d still exists in Database. " +
                    "Please Contact Support.", this.entityName, id));
        }
        log.info("{} with id {} deleted successfully", this.entityName, id);
    }

    /**
     * Check if an instance exists after persisting
     * @param id The id of the instance
     */
    public void checkEntityExitsts(Long id) {
        this.checkIDNotNull(id);
        if(!this.repository.existsById(id)) {
            log.info("No {} instance with ID {} exists", this.entityName, id);
            throw new NotFoundException(String.format("No %s instance with ID %d exists", this.entityName, id));
        }
    }

    public void checkIDsAreIdentical(Long id, Long id2) {
        if(id.longValue() != id2.longValue()) {
            log.info("IDs {} and {} do not match", id, id2);
            throw new IdInvalidException(String.format("IDs %d and %d do not match", id, id2));
        }
    }

    public boolean checkStirngIsBlankOrNull(String s) {
        return s == null || s.isBlank();
    }
}

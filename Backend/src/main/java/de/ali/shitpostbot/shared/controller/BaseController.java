package de.ali.shitpostbot.shared.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface BaseController<T,E> {
    /**
     * Return all instances of class T
     */
    List<T> findAll();

    /**
     * Retrieves object with id that matches
     * @param id the id to match
     * @return object with id that matches
     */
    T findById(@PathVariable E id);

    /**
     * calls create of the service class of T
     * @param t The instance to persist in the db
     * @return the persisted instance
     */
    T create(@RequestBody T t);

    /**
     * Removes object with id that matches from database
     * @param id id of object to delete from database
     * @return the id of the object that is removed from database
     */
    E delete(@PathVariable E id);

    /**
     * Calls update method of service for class t
     * @param t the instance to replace the instance with id
     * @param id the id of the instance to update
     * @return the updated instance
     */
    T update(@RequestBody T t, @PathVariable E id);
}

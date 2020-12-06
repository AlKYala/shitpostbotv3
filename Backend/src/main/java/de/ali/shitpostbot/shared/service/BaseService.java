package de.ali.shitpostbot.shared.service;

import java.util.List;

public interface BaseService<T> {

    /**
     * Method to query for instance by id
     * @param id The instance id
     * @return The instance
     */
    T findById(Long id);

    /**
     * @return all instance of T in the db
     */
    List<T> findAll();

    /**
     * Instantiate instance of class T and persist in db
     * @param t the instance to create
     * @return the created instance
     */
    T create(T t);

    /**
     * if Object by id found replace with instance t
     * @param id The id of the instance to overwrite
     * @param t The instance to have the id after update
     * @return the updated instance
     */
    T update(Long id, T t);

    /**
     * Deletion by id
     * @param id the id of the instance to delete
     * @return The id of the deleted object
     */
    Long deleteById(Long id);
}

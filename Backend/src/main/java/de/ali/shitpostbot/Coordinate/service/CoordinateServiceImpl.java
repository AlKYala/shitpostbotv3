package de.ali.shitpostbot.Coordinate.service;

import de.ali.shitpostbot.Coordinate.model.Coordinate;
import de.ali.shitpostbot.Coordinate.repository.CoordinateRepository;
import de.ali.shitpostbot.Template.repositories.TemplateRepository;
import de.ali.shitpostbot.shared.exceptions.NotFoundException;
import de.ali.shitpostbot.shared.service.Validator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class CoordinateServiceImpl implements CoordinateService {

    private final CoordinateRepository coordinateRepository;
    private final TemplateRepository templateRepository;
    private final Validator<Coordinate, CoordinateRepository> validator;

    public CoordinateServiceImpl(CoordinateRepository coordinateRepository,
                                 TemplateRepository templateRepository) {
        this.coordinateRepository = coordinateRepository;
        this.templateRepository = templateRepository;
        this.validator = new Validator<Coordinate, CoordinateRepository>("Coordinate", this.coordinateRepository);
    }

    @Override
    public Coordinate findById(Long id) {
        return this.coordinateRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException(String.format("No Coordinate by ID %d found", id)));
    }

    @Override
    public List<Coordinate> findAll() {
        return this.coordinateRepository.findAll();
    }

    @Override
    public Long deleteById(Long id) {
        this.validator.checkIDNotNull(id);
        this.coordinateRepository.deleteById(id);
        this.validator.checkEntityExitsts(id);
        return id;
    }

    @Override
    public Coordinate create(Coordinate coordinate) {
        this.validator.checkIDNotNull(coordinate.getId());
        log.info("Coordinate with id {} created successfully", coordinate.getId());
        return this.coordinateRepository.save(coordinate);
    }

    @Override
    public Coordinate update(Long id, Coordinate coordinate) {
        this.validator.checkEntityExitsts(id);
        this.validator.checkIDsAreIdentical(id, coordinate.getId());
        log.info("Coordinate with ID {} updated", id);
        return this.coordinateRepository.save(coordinate);
    }
}

package de.ali.shitpostbot.Coordinate.service;

import de.ali.shitpostbot.Coordinate.model.Coordinate;
import de.ali.shitpostbot.Coordinate.repository.CoordinateRepository;
import de.ali.shitpostbot.Template.repositories.TemplateRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CoordinateServiceImpl implements CoordinateService {

    private final CoordinateRepository coordinateRepository;
    private final TemplateRepository templateRepository;

    public CoordinateServiceImpl(CoordinateRepository coordinateRepository,
                                 TemplateRepository templateRepository) {
        this.coordinateRepository = coordinateRepository;
        this.templateRepository = templateRepository;
    }

    @Override
    public Coordinate findById(Long id) {
        /*return this.coordinateRepository.findById(id)
                .orElseThrow(() -> )*/
    }
}

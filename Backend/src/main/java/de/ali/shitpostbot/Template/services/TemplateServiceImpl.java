package de.ali.shitpostbot.Template.services;

import de.ali.shitpostbot.Coordinate.repository.CoordinateRepository;
import de.ali.shitpostbot.Template.model.Template;
import de.ali.shitpostbot.Template.repositories.TemplateRepository;
import de.ali.shitpostbot.shared.exceptions.NotFoundException;
import de.ali.shitpostbot.shared.exceptions.NotSavedException;
import de.ali.shitpostbot.shared.service.Validator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class TemplateServiceImpl implements TemplateService {

    private final TemplateRepository templateRepository;
    private final CoordinateRepository coordinateRepository;
    private Validator<Template, TemplateRepository> validator;

    public TemplateServiceImpl(TemplateRepository templateRepository,
                               CoordinateRepository coordinateRepository) {
        this.templateRepository = templateRepository;
        this.coordinateRepository = coordinateRepository;
        this.validator =
                new Validator<Template, TemplateRepository>("Template", this.templateRepository);
    }

    @Override
    public Template findById(Long id) {
        return this.templateRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException(String.format("Template with ID %d not found", id)));
    }

    @Override
    public List<Template> findAll() {
        return this.templateRepository.findAll();
    }

    @Override
    public Long deleteById(Long id) {
        this.validator.checkIDNotNull(id);
        Template currentTemplate = this.templateRepository.findById(id).get();
        currentTemplate.getCoordinates().forEach(
                coordinate -> this.coordinateRepository.deleteById(coordinate.getId())
        );
        this.templateRepository.deleteById(id);
        log.info("Template with ID {} deleted successfully", id);
        return id;
    }

    @Override
    public Template create(Template template) {
        this.validator.checkIDNotNull(template.getId());
        this.checkFieldsValid(template);
        log.info("{Template with ID {} saved successfully}", template.getId());
        return this.templateRepository.save(template);
    }

    @Override
    public Template update(Long id, Template template) {
        this.validator.checkIDsAreIdentical(id, template.getId());
        this.checkFieldsValid(template);
        Template oldTemplate = this.templateRepository.findById(id).get();
        template.setCoordinates(oldTemplate.getCoordinates());
        log.info("Template with ID {} updated successfully", id);
        return this.templateRepository.save(template);
    }

    @Override
    public boolean hasCoordinate(Template template) {
        return !template.getCoordinates().isEmpty();
    }

    @Override
    public void checkFieldsValid(Template template) {
        /* hochgeladene templates haben keine koordinaten -
        die werden erst danach hochgeladen!
        if(!hasCoordinate(template)) {
            throw new NotSavedException("The passed Template needs a coordinate");
        }*/
        if(template.getBaseUrl() == null || template.getBaseUrl().isBlank()) {
            throw new NotSavedException("The passed Template needs a base URL");
        }
    }
}

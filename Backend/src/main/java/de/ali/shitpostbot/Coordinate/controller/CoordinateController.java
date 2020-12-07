package de.ali.shitpostbot.Coordinate.controller;

import de.ali.shitpostbot.Coordinate.model.Coordinate;
import de.ali.shitpostbot.Coordinate.service.CoordinateService;
import de.ali.shitpostbot.shared.controller.BaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coordinates")
@RequiredArgsConstructor
public class CoordinateController implements BaseController<Coordinate, Long> {
    @Autowired
    private CoordinateService coordinateService;

    @Override
    @GetMapping
    public List<Coordinate> findAll() {
        return this.coordinateService.findAll();
    }

    @Override
    @GetMapping("/{id}")
    public Coordinate findById(@PathVariable Long id) {
        return this.coordinateService.findById(id);
    }

    @Override
    @PostMapping
    public Coordinate create(@RequestBody Coordinate coordinate) {
        return this.coordinateService.create(coordinate);
    }

    @Override
    @DeleteMapping("/{id}")
    public Long delete(@PathVariable Long id) {
        return this.coordinateService.deleteById(id);
    }

    @Override
    @PutMapping("/{id}")
    public Coordinate update(@RequestBody Coordinate coordinate, @PathVariable Long id) {
        return this.coordinateService.update(id, coordinate);
    }
}

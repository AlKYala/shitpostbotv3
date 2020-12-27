import {Component, Input, OnInit} from '@angular/core';
import {Template} from '../../shared/template/model/Template';
import {first} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Image} from '../../shared/image/model/Image';
import {TemplateService} from '../../shared/template/service/template.service';
import {CoordinateService} from '../../shared/coordinate/service/coordinate.service';
import {Coordinate} from '../../shared/coordinate/model/Coordinate';

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.css']
})
export class TemplateDetailComponent implements OnInit {
  public template: Template;
  public coordinates: Coordinate[];

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private templateService: TemplateService,
              private coordinateService: CoordinateService) { }

  ngOnInit(): void {
    this.resolveRouterParam();
    this.initCoordinates();
  }

  public resolveRouterParam(): void {
    this.route.paramMap.pipe(first()).subscribe((params: ParamMap) => {
      this.templateService.findById(parseInt(params.get('id'), 10))
        .pipe(first()).subscribe((template: Template) => {
        this.template = template;
      });
    });
  }

  public initCoordinates(): void {
    this.coordinates = [];
    this.route.paramMap.pipe(first()).subscribe((params: ParamMap) => {
      this.coordinateService.findByTemplate(parseInt(params.get('id'), 10))
        .pipe(first()).subscribe((coordinates: Coordinate[]) => {
          console.log(coordinates.length);
          for (const coordinate of coordinates) {
            this.coordinates.push(coordinate);
          }
      });
    });
  }
}

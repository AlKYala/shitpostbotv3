import {Component, Input, OnInit} from '@angular/core';
import {Template} from '../../shared/template/model/Template';
import {first} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Image} from '../../shared/image/model/Image';
import {TemplateService} from '../../shared/template/service/template.service';
import {CoordinateService} from '../../shared/coordinate/service/coordinate.service';
import {Coordinate} from '../../shared/coordinate/model/Coordinate';
import {DomSanitizer} from '@angular/platform-browser';
import {async} from 'rxjs';

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.scss']
})
export class TemplateDetailComponent implements OnInit {
  public template: Template;
  public coordinates: Coordinate[];
  public imageBase64: string; //the image where the squares are marked

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private templateService: TemplateService,
              private coordinateService: CoordinateService,
              private readonly domSanitzer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadDrawnImage();
    this.resolveRouterParam();
  }

  public resolveRouterParam(): void {
    this.route.paramMap.pipe(first()).subscribe((params: ParamMap) => {
      this.templateService.findById(parseInt(params.get('id'), 10))
        .pipe(first()).subscribe((template: Template) => {
        this.template = template;
      });
    });
  }

  /* TODO
  * Es funktioniert noch nicht - der String wird nicht geladen - dauert zu lange?
  * Im network tab laedt es aber!
  * */
  public loadDrawnImage(): void {
    this.route.paramMap.pipe(first()).subscribe((params: ParamMap) => {
      this.templateService.findTemplateSquareImageById(parseInt(params.get('id'), 10)).pipe(first())
        .subscribe((base64Image: any) => {
          console.log(base64Image);
          //this.imageBase64 = base64Image;
          this.imageBase64 = this.domSanitzer.bypassSecurityTrustUrl(base64Image).toString();
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

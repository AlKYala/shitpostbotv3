import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Template} from '../../shared/template/model/Template';
import {first} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Image} from '../../shared/image/model/Image';
import {TemplateService} from '../../shared/template/service/template.service';
import {CoordinateService} from '../../shared/coordinate/service/coordinate.service';
import {Coordinate} from '../../shared/coordinate/model/Coordinate';
import {DomSanitizer} from '@angular/platform-browser';
import {async, Subscription} from 'rxjs';
import {SubscriptionService} from '../../shared/services/subscription.service';

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.scss']
})
export class TemplateDetailComponent implements OnInit, OnDestroy {
  public template: Template;
  public coordinates: Coordinate[];
  public imageBase64: string; // the image where the squares are marked
  public subscriptions: Subscription[];

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private templateService: TemplateService,
              private coordinateService: CoordinateService,
              private readonly domSanitzer: DomSanitizer,
              private readonly subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.loadDrawnImage();
    this.resolveRouterParam();
  }
  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll(this.subscriptions);
  }
  public resolveRouterParam(): void {
    const subscription = this.route.paramMap.pipe(first()).subscribe((params: ParamMap) => {
      const subscriptionC = this.templateService.findById(parseInt(params.get('id'), 10))
        .pipe(first()).subscribe((template: Template) => {
        this.template = template;
      });
      this.subscriptions.push(subscriptionC);
    });
    this.subscriptions.push(subscription);
  }

  /* TODO
  * Es funktioniert noch nicht - der String wird nicht geladen - dauert zu lange?
  * Im network tab laedt es aber!
  * */
  public loadDrawnImage(): void {
    const subscription = this.route.paramMap.pipe(first()).subscribe((params: ParamMap) => {
      const subscriptionC = this.templateService.findTemplateSquareImageById(parseInt(params.get('id'), 10)).pipe(first())
        .subscribe((base64Image: any) => {
          // this.imageBase64 = base64Image;
          this.imageBase64 = this.domSanitzer.bypassSecurityTrustUrl(base64Image).toString();
        });
      this.subscriptions.push(subscriptionC);
    });
    this.subscriptions.push(subscription);
  }

  public initCoordinates(): void {
    this.coordinates = [];
    const subscription = this.route.paramMap.pipe(first()).subscribe((params: ParamMap) => {
      const subscriptionC = this.coordinateService.findByTemplate(parseInt(params.get('id'), 10))
        .pipe(first()).subscribe((coordinates: Coordinate[]) => {
          console.log(coordinates.length);
          for (const coordinate of coordinates) {
            this.coordinates.push(coordinate);
          }
      });
      this.subscriptions.push(subscriptionC);
    });
    this.subscriptions.push(subscription);
  }
}

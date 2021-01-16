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
import {DrawnTemplateService} from '../../shared/drawnTemplate/service/drawnTemplateService';
import {DrawnTemplate} from '../../shared/drawnTemplate/model/drawnTemplate';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ShitpostService} from '../../shared/shitpost/service/shitpost.service';
import {Shitpost} from '../../shared/shitpost/model/shitpost';
import {UserService} from '../../shared/user/service/user.service';
import {LocalStorageService} from '../../shared/services/localstorage.service';
import {User} from '../../shared/user/model/User';

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
  public tempShitpost: Shitpost;
  public isPosterCurrentUser;
  public maxid: number;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly templateService: TemplateService,
              private readonly coordinateService: CoordinateService,
              private readonly domSanitzer: DomSanitizer,
              private readonly subscriptionService: SubscriptionService,
              private readonly drawnTemplateService: DrawnTemplateService,
              private readonly ngxSmartModalService: NgxSmartModalService,
              private readonly shitpostService: ShitpostService,
              private readonly userService: UserService,
              private readonly localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.subscriptions = [];
    this.loadDrawnImage();
    this.resolveRouterParam();
    this.initMaxTemplateId();
    this.checkPosterIsCurrentUser();
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
      const subscriptionC = this.drawnTemplateService.findDrawnTemplate(parseInt(params.get('id'), 10)).pipe()
        .subscribe((base64Image: DrawnTemplate) => {
          // this.imageBase64 = base64Image;
          console.log(base64Image.base64Representation);
          this.imageBase64 = base64Image.base64Representation;
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

  public getShitpostFromTemplate(id: number): void {
    this.shitpostService.generateShitPost(id).pipe().subscribe((shitpost: Shitpost) => {
      this.tempShitpost = shitpost;
    });
    this.openModal('shitpostModal');
  }

  public openModal(id: string): void {
    this.ngxSmartModalService.open(id);
  }

  public checkPosterIsCurrentUser(): void {
    const subscription = this.userService.findByUsername(this.localStorageService.getCurrentUsername())
      .pipe().subscribe((user: User) => {
        this.isPosterCurrentUser = (this.template.poster.id === user.id);
      });
    this.subscriptions.push(subscription);
  }

  public initMaxTemplateId(): void {
    const subscription = this.templateService.getCount().pipe().subscribe((data: number) => {
      this.maxid = data;
    });
    this.subscriptions.push(subscription);
  }
}

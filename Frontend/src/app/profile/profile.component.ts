import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from '../../shared/services/localstorage.service';
import {ImageService} from '../../shared/image/service/image.service';
import {TemplateService} from '../../shared/template/service/template.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Image} from '../../shared/image/model/Image';
import {Template} from '../../shared/template/model/Template';
import {UserService} from '../../shared/user/service/user.service';
import {User} from '../../shared/user/model/User';
import {UserToken} from '../../shared/interfaces/UserToken';
import {delay, first} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {SubscriptionService} from '../../shared/services/subscription.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public images: Image[];
  public templates: Template[];
  private posterId: number;
  public poster: User;
  public currentUserUsername: string;
  public isPosterUser: boolean;
  public subscriptions: Subscription[];

  constructor(private readonly localStorageService: LocalStorageService,
              private readonly imageService: ImageService,
              private readonly templateService: TemplateService,
              private readonly userService: UserService,
              private route: ActivatedRoute,
              private readonly subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.subscriptions = [];
    this.resolveRouterParam();
    this.initTemplates();
    this.initImages();
    this.initUser();
    this.initCurrentUser();
  }
  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll(this.subscriptions);
  }
  private resolveRouterParam(): void {
    const subscription = this.route.paramMap.pipe().subscribe((params: ParamMap) => {
      this.posterId = (parseInt(params.get('id'), 10));
    });
    this.subscriptions.push(subscription);
  }
  private initTemplates(): void {
    const subscription = this.templateService.findAll().pipe().subscribe((templates: Template[]) => {
      this.templates = templates.filter((template: Template) => template.poster.id === this.posterId);
    });
    this.subscriptions.push(subscription);
  }
  private initImages(): void {
    const subscription = this.imageService.findAll().pipe().subscribe((images: Image[]) => {
      this.images = images.filter((image: Image) => image.poster.id === this.posterId);
    });
    this.subscriptions.push(subscription);
  }
  private initUser(): void {
    const subscription = this.userService.findById(this.posterId).pipe().subscribe((user: User) => {
      this.poster = user;
      this.isPosterUser = (this.currentUserUsername === this.poster.username);
    });
    this.subscriptions.push(subscription);
  }
  private initCurrentUser(): void {
    this.currentUserUsername = this.localStorageService.getUserToken().sub;
  }
  private linkToImage(image: Image): string {
    return `/images/${image.id}`;
  }
  private linkToTemplate(template: Template): string {
    return `/templates/${template.id}`;
  }
}

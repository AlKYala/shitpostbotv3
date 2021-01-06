import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../shared/user/service/user.service';
import {TemplateService} from '../../shared/template/service/template.service';
import {Template} from '../../shared/template/model/Template';
import {first} from 'rxjs/operators';
import {Image} from '../../shared/image/model/Image';
import {Subscription} from 'rxjs';
import {SubscriptionService} from '../../shared/services/subscription.service';

@Component({
  selector: 'app-template-gallery',
  templateUrl: './template-gallery.component.html',
  styleUrls: ['./template-gallery.component.css']
})
export class TemplateGalleryComponent implements OnInit, OnDestroy {
  public templates: Template[];
  public subscriptions: Subscription[];
  constructor(private readonly router: Router,
              private readonly userService: UserService,
              private readonly templateService: TemplateService,
              private readonly subscriptionService: SubscriptionService) { }
  ngOnInit(): void {
    this.subscriptions = [];
    this.loadAllTemplates();
  }
  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll(this.subscriptions);
  }
  private loadAllTemplates(): void {
    const subscription = this.templateService.findAll()
      .pipe(first())
      .subscribe((templates: Template[]) => {
        this.templates = templates;
        console.log(this.templates.length);
      });
    this.subscriptions.push(subscription);
  }
  public formatRouting(id: number): string {
    return `./${id}`;
  }
}

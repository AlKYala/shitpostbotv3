import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Template} from '../../shared/template/model/Template';
import {User} from '../../shared/user/model/User';
import {LocalStorageService} from '../../shared/services/localstorage.service';
import {SubscriptionService} from '../../shared/services/subscription.service';
import {Subscription} from 'rxjs';
import {TemplateService} from '../../shared/template/service/template.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-template-item',
  templateUrl: './template-item.component.html',
  styleUrls: ['./template-item.component.scss']
})
export class TemplateItemComponent implements OnInit, OnDestroy {
  @Input() public template: Template;
  public templatePoster: User;
  public subscriptions: Subscription[];
  constructor(private readonly localStorageService: LocalStorageService,
              private readonly subscriptionService: SubscriptionService,
              private readonly templateService: TemplateService,
              private readonly toastrService: ToastrService) {
  }
  ngOnInit(): void {
    this.subscriptions = [];
    this.templatePoster = this.template.poster;
  }
  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll(this.subscriptions);
  }
  private checkIsUserPoster(): boolean {
    return this.templatePoster.id === this.localStorageService.getCurrentUserId();
  }
  private checkIsUserAdmin(): boolean {
    return this.localStorageService.getAdminState();
  }
  public canDelete(): boolean {
    return this.checkIsUserAdmin() || this.checkIsUserPoster();
  }
  public deleteTemplate(template: Template): void {
    const subscription: Subscription = this.templateService.delete(template.id).pipe().subscribe((id: number) => {
      location.reload();
      this.toastrService.success(`Template with ID ${id} deleted`);
    });
  }
}

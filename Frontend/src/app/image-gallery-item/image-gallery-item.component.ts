import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Image} from '../../shared/image/model/Image';
import {User} from '../../shared/user/model/User';
import {ImageService} from '../../shared/image/service/image.service';
import {Subscription} from 'rxjs';
import {SubscriptionService} from '../../shared/services/subscription.service';
import {LocalStorageService} from '../../shared/services/localstorage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-image-gallery-item',
  templateUrl: './image-gallery-item.component.html',
  styleUrls: ['./image-gallery-item.component.scss']
})
export class ImageGalleryItemComponent implements OnInit, OnDestroy {
  @Input() public image: Image;
  private imageUrl: string;
  private imagePoster: User;
  private subscriptions: Subscription[];
  constructor(private readonly imageService: ImageService,
              private readonly subscriptionService: SubscriptionService,
              private readonly localStorageService: LocalStorageService,
              private readonly toastrService: ToastrService) { }

  ngOnInit(): void {
    this.subscriptions = [];
    this.imagePoster = this.image.poster;
  }
  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll(this.subscriptions);
  }
  private checkIsUserPoster(): boolean {
    // usernames are unique
    //console.log(this.imagePoster.id);
    console.log(this.localStorageService.getCurrentUserId());
    return this.localStorageService.getCurrentUserId() === this.imagePoster.id;
  }
  private isUserAdmin(): boolean {
    return this.localStorageService.getAdminState();
  }
  public canDelete(): boolean {
    return this.isUserAdmin() || this.checkIsUserPoster();
  }
  public deletePost(image: Image): void {
    const subscription = this.imageService.delete(image.id).pipe().subscribe((id: number) => {
      location.reload();
      this.toastrService.success(`Image with ID ${id} deleted`);
    });
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImageService} from '../../shared/image/service/image.service';
import {Image} from '../../shared/image/model/Image';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {SubscriptionService} from '../../shared/services/subscription.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit, OnDestroy {
  public images: Image[];
  private subscriptions: Subscription[];

  constructor(private readonly imageService: ImageService,
              private readonly subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.loadAllImages();
  }
  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll(this.subscriptions);
  }
  private loadAllImages(): void {
    const subscription = this.imageService.findAll()
      .pipe()
      .subscribe((images: Image[]) => {
        this.images = images;
        console.log(this.images.length);
      });
    this.subscriptions.push(subscription);
  }
  public formatRouting(id: number): string {
    return `./${id}`;
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Image} from '../../shared/image/model/Image';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ImageService} from '../../shared/image/service/image.service';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {
  public image: Image;
  public subscriptions: Subscription[];
  constructor(private readonly router: Router,
              private route: ActivatedRoute,
              private readonly imageService: ImageService) { }

  ngOnInit(): void {
    this.subscriptions = [];
    this.resolveRouterParam();
  }

  public resolveRouterParam(): void {
    const subscription = this.route.paramMap.pipe().subscribe((params: ParamMap) => {
      const subscriptionC = this.imageService.findById(parseInt(params.get('id'), 10))
        .pipe().subscribe((image: Image) => {
          this.image = image;
        });
      this.subscriptions.push(subscriptionC);
    });
    this.subscriptions.push(subscription);
  }
}

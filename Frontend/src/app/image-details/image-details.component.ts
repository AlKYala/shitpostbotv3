import {Component, Input, OnInit} from '@angular/core';
import {Image} from '../../shared/image/model/Image';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ImageService} from '../../shared/image/service/image.service';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {UserService} from '../../shared/user/service/user.service';
import {LocalStorageService} from '../../shared/services/localstorage.service';
import {User} from '../../shared/user/model/User';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {
  public image: Image;
  public subscriptions: Subscription[];
  public maxid: number;
  public isPosterCurrentUser: boolean;

  constructor(private readonly router: Router,
              private route: ActivatedRoute,
              private readonly imageService: ImageService,
              private readonly userService: UserService,
              private readonly localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.initNumberOfImages();
    this.subscriptions = [];
    this.resolveRouterParam();
    this.checkPosterIsCurrentUser();
  }

  public initNumberOfImages(): void {
    this.imageService.getCount().pipe().subscribe((data: number) => {
      this.maxid = data;
    });
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

  private checkPosterIsCurrentUser(): void {
    const subscription = this.userService.findByUsername(this.localStorageService.getCurrentUsername())
      .pipe().subscribe((user: User) => {
        this.isPosterCurrentUser = (user.id === this.image.poster.id);
      });
    this.subscriptions.push(subscription);
  }
}

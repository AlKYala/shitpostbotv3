import {Component, Input, OnInit} from '@angular/core';
import {Image} from '../../shared/image/model/Image';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ImageService} from '../../shared/image/service/image.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {
  public image: Image;
  constructor(private readonly router: Router,
              private route: ActivatedRoute,
              private readonly imageService: ImageService) { }

  ngOnInit(): void {
    this.resolveRouterParam();
  }

  public resolveRouterParam(): void {
    this.route.paramMap.pipe(first()).subscribe((params: ParamMap) => {
      this.imageService.findById(parseInt(params.get('id'), 10))
        .pipe(first()).subscribe((image: Image) => {
          this.image = image;
        });
    });
  }
}

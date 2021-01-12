import {Component, ElementRef, OnInit} from '@angular/core';
import {ShitpostService} from '../../shared/shitpost/service/shitpost.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Shitpost} from '../../shared/shitpost/model/shitpost';
import {Image} from '../../shared/image/model/Image';
import {ImageService} from '../../shared/image/service/image.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public backgroundImage: Image;

  constructor(public ngxSmartModalService: NgxSmartModalService,
              private readonly imageService: ImageService,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.initBackgroundImage();
  }

  public initBackgroundImage(): void {
    this.imageService.findRandom().pipe().subscribe((image: Image) => {
      this.backgroundImage = image;
      const backgroundStyle =
        `body {
          background-image: url(${image.url});
        }`;
      this.createStyle(backgroundStyle);
    });
  }

  public loadShitpost(): void {
    this.ngxSmartModalService.getModal('shitpostModal').open();
  }
  // manipulation of style from typescript
  private createStyle(style: string): void {
    const styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(style));
    this.elementRef.nativeElement.appendChild(styleElement);
  }
}

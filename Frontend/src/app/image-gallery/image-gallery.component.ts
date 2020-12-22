import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../shared/image/service/image.service';
import {Image} from '../../shared/image/model/Image';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {

  public images: Image[];

  constructor(private readonly imageService: ImageService) { }

  ngOnInit(): void {
    this.loadAllImages();
  }
  private loadAllImages(): void {
    this.imageService.findAll()
      .pipe(first())
      .subscribe((images: Image[]) => {
        console.log(this.images.length);
        this.images = images;
      });
  }
}

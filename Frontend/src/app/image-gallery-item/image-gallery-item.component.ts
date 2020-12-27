import {Component, Input, OnInit} from '@angular/core';
import {Image} from '../../shared/image/model/Image';
import {User} from '../../shared/user/model/User';

@Component({
  selector: 'app-image-gallery-item',
  templateUrl: './image-gallery-item.component.html',
  styleUrls: ['./image-gallery-item.component.scss']
})
export class ImageGalleryItemComponent implements OnInit {
  @Input() public image: Image;
  private imageUrl: string;
  private imagePoster: User;
  constructor() { }

  ngOnInit(): void {
    console.log(this.image.url);
  }

}

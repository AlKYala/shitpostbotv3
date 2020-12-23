import {Component, Input, OnInit} from '@angular/core';
import {Image} from '../../shared/image/model/Image';

@Component({
  selector: 'app-image-gallery-item',
  templateUrl: './image-gallery-item.component.html',
  styleUrls: ['./image-gallery-item.component.scss']
})
export class ImageGalleryItemComponent implements OnInit {
  @Input() public image: Image;
  constructor() { }

  ngOnInit(): void {
  }

}

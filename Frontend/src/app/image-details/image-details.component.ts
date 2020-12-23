import {Component, Input, OnInit} from '@angular/core';
import {Image} from '../../shared/image/model/Image';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
  public image: Image;
  constructor(private readonly router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.resolveRouterParam();
  }

  public resolveRouterParam(): void {

  }
}

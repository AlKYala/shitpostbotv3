import {Component, Input, OnInit} from '@angular/core';
import {Shitpost} from '../../shared/shitpost/model/shitpost';

@Component({
  selector: 'app-shitpost-page',
  templateUrl: './shitpost-page.component.html',
  styleUrls: ['./shitpost-page.component.css']
})
export class ShitpostPageComponent implements OnInit {
  @Input() public shitPost: Shitpost;
  constructor() { }

  ngOnInit(): void {
  }

}

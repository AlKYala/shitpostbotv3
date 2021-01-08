import { Component, OnInit } from '@angular/core';
import {ShitpostService} from '../../shared/shitpost/service/shitpost.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Shitpost} from '../../shared/shitpost/model/shitpost';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {


  constructor(private readonly shitpostService: ShitpostService,
              public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit(): void {
  }

  loadShitpost(): void {
    this.ngxSmartModalService.getModal('shitpostModal').open();
  }

}

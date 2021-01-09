import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Shitpost} from '../../shared/shitpost/model/shitpost';
import {ShitpostService} from '../../shared/shitpost/service/shitpost.service';
import {Subscription} from 'rxjs';
import {delay, first} from 'rxjs/operators';

@Component({
  selector: 'app-shitpost-page',
  templateUrl: './shitpost-page.component.html',
  styleUrls: ['./shitpost-page.component.css']
})
export class ShitpostPageComponent implements OnInit, OnDestroy {
  public shitpost: Shitpost;
  private subscriptions: Subscription[];
  constructor(public shitpostService: ShitpostService) { }

  ngOnInit(): void {
    this.subscriptions = [];
    this.initShitpost();
  }
  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.reloadShitpost();
  }
  private initShitpost(): void {
    const subscription = this.shitpostService.generateShitPost().pipe().subscribe((data: Shitpost) => {
      this.shitpost = data;
    });
    this.subscriptions.push(subscription);
  }
  private reloadShitpost(): void {
    this.destroyShitpost();
    this.initShitpost();
  }
  private destroyShitpost(): void {
    this.shitpost = null;
  }
}

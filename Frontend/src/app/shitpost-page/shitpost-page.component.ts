import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Shitpost} from '../../shared/shitpost/model/shitpost';
import {ShitpostService} from '../../shared/shitpost/service/shitpost.service';
import {Subscription} from 'rxjs';
import {delay, first} from 'rxjs/operators';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-shitpost-page',
  templateUrl: './shitpost-page.component.html',
  styleUrls: ['./shitpost-page.component.scss']
})
export class ShitpostPageComponent implements OnInit, OnDestroy {
  @Input() passedId: number;
  public shitpost: Shitpost;
  private subscriptions: Subscription[];
  constructor(public shitpostService: ShitpostService,
              private readonly ngxSmartModalService: NgxSmartModalService) { }

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
    let subscription: Subscription;
    if (this.passedId !== undefined) {
      subscription = this.shitpostService.generateShitPost(this.passedId).pipe().subscribe((data: Shitpost) => {
        this.shitpost = data;
      });
    }
    else {
      subscription = this.shitpostService.generateShitPost().pipe().subscribe((data: Shitpost) => {
        this.shitpost = data;
      });
      this.subscriptions.push(subscription);
    }
  }
  private reloadShitpost(): void {
    this.destroyShitpost();
    this.initShitpost();
  }
  private destroyShitpost(): void {
    this.shitpost = null;
  }
  public closeModal(id: string): void {
    this.ngxSmartModalService.getModal(id).close();
  }

}

import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
/*
Alternative idea: make subscriptionservice take subscriptions and unsubscribe them internally
 */
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  public unsubscribeAll(subscriptions: Subscription[]): void {
    for (const subscription of subscriptions) {
      subscription.unsubscribe();
    }
  }
}

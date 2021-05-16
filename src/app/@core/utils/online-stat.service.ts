import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineStatService {

  isOnlineSub: BehaviorSubject<boolean>;

  constructor() {
    this.isOnlineSub = new BehaviorSubject<boolean>(navigator.onLine);
  }

  updateOnlineStatus(status: boolean): void {
    this.isOnlineSub.next(status);
  }

}

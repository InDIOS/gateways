import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notifications: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);

  get notifications$(): Observable<Notification[]> {
    return this.notifications.asObservable();
  }
  constructor() { }

  add(notify: Notification[]): void {
    this.notifications.next(notify);
  }

  remove(notify: Notification): void {
    const list = this.notifications.value;
    const index = list.indexOf(notify);
    if (index !== -1) {
      list.splice(index, 1);
      this.notifications.next(list);
    }
  }

  reset(): void {
    this.notifications.next([]);
  }
}

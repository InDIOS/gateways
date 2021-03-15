import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Notification } from '../../interfaces';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  subscriptions: Subscription = new Subscription();
  get notifications$(): Observable<Notification[]> {
    return this.notificationService.notifications$;
  }

  constructor(private notificationService: NotificationsService) {}

  closeNotification(notification: Notification): void {
    this.notificationService.remove(notification);
  }
}

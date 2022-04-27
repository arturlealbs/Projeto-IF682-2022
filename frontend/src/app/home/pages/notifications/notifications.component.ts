import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../shared/types/notifications';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})

export class NotificationsComponent implements OnInit {

  public notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {
    notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  ngOnInit(): void {}

  delete(notification: Notification) {
    const index = this.notifications.indexOf(notification);
    this.notifications.splice(index, 1);
    this.notificationService.setNotifications(this.notifications);
  }
}

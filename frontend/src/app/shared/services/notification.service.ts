import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Notification } from '../types/notifications';

import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification = this.socket.fromEvent<Notification>("notifications");

  private notifications: BehaviorSubject<Notification[]> =
  new BehaviorSubject<Notification[]>([{
    to: "",
    text: "Só pra ver como estão as notificações",
    image: "",
    timestamp: ""
  },
  {
    to: "",
    text: "Só pra ver como estão as notificações",
    image: "",
    timestamp: ""
  }]);

  constructor(private socket: Socket) {
    this.notification.subscribe(notification => {
      this.notifications.next([notification, ...this.notifications.getValue()]);
    });
  }

  public setNotifications(notifications: Notification[]) {
    this.notifications.next(notifications);
  }

  public getNotifications(): Observable<Notification[]> {
    return this.notifications.asObservable();
  }

  public sendNotification(notification: Notification) {
    this.socket.emit("notifications", notification);
  }
}

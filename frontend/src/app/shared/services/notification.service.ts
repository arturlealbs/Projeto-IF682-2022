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
  new BehaviorSubject<Notification[]>([
    {
      image: "https://img.myloview.com.br/adesivos/man-icon-vector-user-person-profile-avatar-in-flat-color-glyph-pictogram-illustration-400-163243024.jpg",
      text: "Uau! Parece que voce e [user] deram Match!",
      time: "14:36"
    },
    {
      image: "https://img.myloview.com.br/adesivos/man-icon-vector-user-person-profile-avatar-in-flat-color-glyph-pictogram-illustration-400-163243024.jpg",
      text: "Uau! Parece que voce e [user] deram Match!",
      time: "14:36"
    },
    {
      image: "https://img.myloview.com.br/adesivos/man-icon-vector-user-person-profile-avatar-in-flat-color-glyph-pictogram-illustration-400-163243024.jpg",
      text: "Uau! Parece que voce e [user] deram Match!",
      time: "14:36"
    },
    {
      image: "https://img.myloview.com.br/adesivos/man-icon-vector-user-person-profile-avatar-in-flat-color-glyph-pictogram-illustration-400-163243024.jpg",
      text: "Uau! Parece que voce e [user] deram Match!",
      time: "14:36"
    },
  ]);

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
}

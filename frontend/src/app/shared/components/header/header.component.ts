import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

  notificationCount: number = 4;

  constructor(
    private profileService: ProfileService,
    private notificationService: NotificationService,
  ) {
    notificationService.getNotifications().subscribe(notifications => {
      this.notificationCount = notifications.length;
    });
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('TOKEN');
    this.profileService.signOut();
  }

}

import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

  notificationCount: number = 4;

  constructor(
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('TOKEN');
    this.profileService.signOut();
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

  notificationCount: number = 4;

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    console.log("logout");
  }

}

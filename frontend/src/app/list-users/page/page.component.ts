import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/types/User';
import { ListUsersFacade } from '../list-users.facade';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  userList: User[] = []

  constructor(
    listUserFacade: ListUsersFacade
  ) { 
    listUserFacade.getUserList().subscribe((userList) => {
      this.userList = userList;
    })
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/shared/services/users.service';
import { User, defaultUser } from 'src/app/shared/types/User';
import { HomeFacade } from '../../home.facade';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public profile: User = defaultUser;

  constructor(
    private homeFacade: HomeFacade,
    private usersService: UsersService,
	  private router: Router,
  ) { 
    this.homeFacade.getProfile().subscribe(profile => {
      this.profile = {...this.profile, ...profile};
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  public register() {
    this.homeFacade.setProfile(this.profile);
    this.usersService.createUser(this.profile).subscribe(async ({ data }) => {
      if (data?.createUser) {
        if (data.createUser.title) {
          alert(data.createUser.title + '\n' + data.createUser.reason);
        }
        const { token } = await this.usersService.getToken();
        if (token) {
          localStorage.setItem("TOKEN", token);
          this.router.navigate(['/']);
        }
      }
    })
    return false;
  }
}

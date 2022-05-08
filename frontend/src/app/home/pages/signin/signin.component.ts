import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/shared/services/users.service';
import { User, defaultUser } from 'src/app/shared/types/User';
import { ProfileService } from '../../../shared/services/profile.service';
import { HomeFacade } from '../../home.facade';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public profile: User = defaultUser;

  constructor(
    private profileService: ProfileService,
    private usersService: UsersService,
    private homeFacade: HomeFacade,
	  private router: Router,
  ) { 
    this.homeFacade.getProfile().subscribe(profile => {
      console.log(profile);
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
    this.usersService.createUser(this.profile).subscribe(async ({ data }) => {
      this.homeFacade.setProfile(this.profile);
      if (data?.createUser) {
        if (data.createUser.title) {
          alert(data.createUser.title + '\n' + data.createUser.reason);
        }
        const { token } = await this.usersService.getToken();
        if (token) {
          localStorage.setItem("TOKEN", token);
          this.profileService.setProfile(this.profile);
          this.router.navigate(['/']);
        }
      }
    });
    return false;
  }
}

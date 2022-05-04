import { ProfileService } from 'src/app/shared/services/profile.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { defaultUser } from 'src/app/shared/types/User';
import { HomeFacade } from '../../home.facade';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
    private usersService: UsersService,
    private homeFacade: HomeFacade,
	  private router: Router,
  ) {}

  ngOnInit(): void {
    this.profileService.getLoginProfile().subscribe(async (user) => {
      if (!user) return;
       
      const loginToken = localStorage.getItem("TOKEN") as string;
      const { token } = await this.usersService.getToken();

      if (token) {
        localStorage.setItem("TOKEN", token);
        const newProfile = await this.usersService.getUser();
        this.profileService.setProfile(newProfile);
        return this.router.navigate(['/']);
      }

      if (user.provider === "GOOGLE") {
        this.homeFacade.getGoogleProfileData(loginToken);
      } else {
        this.homeFacade.getFacebookProfileData(user.id, loginToken);
      }
      this.homeFacade.setProfile({...defaultUser, ...user});
      return this.router.navigate(['/signin']);
    });
  }

  fbLogin(): void {
    this.profileService.signIn(true);
  }
  
  GGLogin(): void {
    this.profileService.signIn();
  }

}

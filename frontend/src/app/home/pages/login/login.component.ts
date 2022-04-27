import { ProfileService } from 'src/app/shared/services/profile.service';
import { UsersService } from 'src/app/shared/services/users.service';
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
    this.profileService.getProfile().subscribe(async (user) => {
      if (!user) return;
       
      const FBToken = localStorage.getItem("TOKEN") as string;

      const { token } = await this.usersService.getToken();
      console.log(token);
      if (token) {
        localStorage.setItem("TOKEN", token);
        return this.router.navigate(['/']);
      }

      this.homeFacade.getFacebookProfileData(user.id, FBToken);
      this.homeFacade.setProfile(user);
      return this.router.navigate(['/signin']);
    });
  }

  signin(): void {
    this.profileService.signIn();
  }

}

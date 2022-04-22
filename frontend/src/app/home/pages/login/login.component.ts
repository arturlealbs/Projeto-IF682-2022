import { ProfileService } from 'src/app/shared/services/profile.service';
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
    private homeFacade: HomeFacade,
	  private router: Router,
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((user) => {
      if (!user) return;
       
      const token = localStorage.getItem("TOKEN") as string;
      this.homeFacade.getFacebookProfileData(user.id, token);
      this.homeFacade.setProfile(user);
      this.router.navigate(['/signin']);
    });
  }

  signin(): void {
    this.profileService.signIn();
  }

}

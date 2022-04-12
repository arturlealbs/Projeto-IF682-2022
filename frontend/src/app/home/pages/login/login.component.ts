import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  SocialAuthService, 
  FacebookLoginProvider
} from 'angularx-social-login';

import { HomeFacade } from '../../home.facade';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private socialAuthService: SocialAuthService,
    private homeFacade: HomeFacade,
	  private router: Router,
  ) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      localStorage.setItem("TOKEN", user.authToken);
      this.homeFacade.setFacebookProfile({
        id: user.id, 
        name: user.name,
        email: user.email, 
        username: user.name,
        lastName: user.lastName, 
        firstName: user.firstName, 
        profileImg: user.response.picture.data.url
      });
      this.homeFacade.getFacebookProfileData(
        user.id, user.authToken
      );
      this.router.navigate(['/signin']);
    });
  }

  signin(): void {
    this.socialAuthService.signIn(
      FacebookLoginProvider.PROVIDER_ID
    );
  }

  logout(): void {
    this.socialAuthService.signOut();
  }

}

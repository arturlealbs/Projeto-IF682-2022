import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, defaultUser } from '../../../shared/types/User';
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
	  private router: Router,
  ) { 
    this.homeFacade.getFacebookProfile().subscribe(profile => {
      this.profile = {...this.profile, ...profile};
    });
  }

  ngOnInit(): void {
  }

  public register() {
    console.log("Registrando")
    this.homeFacade.setProfile(this.profile);
    this.router.navigate(['/']);
    return false;
  }
}

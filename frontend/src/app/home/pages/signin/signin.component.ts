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
    this.router.navigate(['/']);
    return false;
  }
}

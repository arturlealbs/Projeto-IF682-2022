import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../types/User';

import { 
  SocialAuthService, 
  FacebookLoginProvider,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { SocialUser } from '../types/social-user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  private loginProfile: BehaviorSubject<SocialUser|null> = 
    new BehaviorSubject<SocialUser|null>(null);

  constructor(
    private socialAuthService: SocialAuthService,
  ) {
    this.socialAuthService.authState.subscribe((user) => {
      if (!user) return;
      console.log(user);
      localStorage.setItem("TOKEN", user.authToken);
      const profileImg = user.provider !== "GOOGLE" ?
        user.response.picture.data.url : user.photoUrl;
      this.loginProfile.next({
        profileImg,
        id: user.id,
        email: user.email,
        username: user.name,
        provider: user.provider,
        lastName: user.lastName,
        firstName: user.firstName,
      });
    });
  }

  public signIn(facebook: boolean = false): void {
    this.socialAuthService.signIn(
      facebook ? FacebookLoginProvider.PROVIDER_ID
      : GoogleLoginProvider.PROVIDER_ID
    );
  }

  public signOut(): void {
    localStorage.removeItem("TOKEN");
    this.socialAuthService.signOut();
    this.profile.next(null);
  }

  public getProfile(): Observable<User|null> {
    return this.profile.asObservable()
  }
  
  public getLoginProfile(): Observable<SocialUser|null> {
    return this.loginProfile.asObservable()
  }

  public setProfile(profile: User) {
    this.profile.next(profile);
  }
}

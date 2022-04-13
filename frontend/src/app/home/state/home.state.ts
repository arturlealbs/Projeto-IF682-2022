import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { User } from "../../shared/types/User";
import { 
  FacebookUser,
  defaultFacebookUser
} from "../types/facebook-user";

@Injectable({ providedIn: 'root' })
export class HomeState {
  private profile: BehaviorSubject<User|null> = 
    new BehaviorSubject<User|null>(null);
  private facebookProfile: BehaviorSubject<FacebookUser> =
    new BehaviorSubject<FacebookUser>(defaultFacebookUser);

  public constructor() {}

  public setProfile(profile: User) {
    this.profile.next(profile);
  }

  public getProfile(): Observable<User|null> {
    return this.profile.asObservable();
  }

  public getCurrentProfile(): User|null {
    return this.profile.getValue();
  }

  public getFacebookProfile(): Observable<FacebookUser> {
    return this.facebookProfile.asObservable();
  }
  
  public getCurrentFacebookProfile(): FacebookUser {
    return this.facebookProfile.getValue();
  }

  public setFacebookProfile(profile: FacebookUser) {
    this.facebookProfile.next(profile);
  }
}
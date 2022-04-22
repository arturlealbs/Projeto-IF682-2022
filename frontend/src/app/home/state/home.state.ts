import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { User } from "../../shared/types/User";

@Injectable({ providedIn: 'root' })
export class HomeState {
  private profile: BehaviorSubject<User|null> = 
    new BehaviorSubject<User|null>(null);

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
}
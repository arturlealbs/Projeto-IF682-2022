import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private username: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private profile: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);

  constructor() {}

  public getUsername(): Observable<string> {
    return this.username.asObservable()
  }

  public setUsername(username: string) {
    this.username.next(username);
  }
  
  public getProfile(): Observable<User|null> {
    return this.profile.asObservable()
  }

  public setProfile(profile: User) {
    this.profile.next(profile);
  }
}

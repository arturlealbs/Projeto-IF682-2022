import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private username: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() {}

  public getUsername(): Observable<string> {
    return this.username.asObservable()
  }

  public setUsername(username: string) {
    this.username.next(username);
  }
}

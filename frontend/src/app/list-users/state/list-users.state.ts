import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { defaultUser, User } from "../../shared/types/User";

@Injectable({ providedIn: 'root' })
export class ListUsersState {
  private userList: BehaviorSubject<User[]> = 
    new BehaviorSubject<User[]>([
      defaultUser, defaultUser, defaultUser, 
      defaultUser, defaultUser, defaultUser, 
      defaultUser
    ]);

  public constructor() {}

  public setUserList(userList: User[]) {
    this.userList.next(userList);
  }

  public getUserList(): Observable<User[]> {
    return this.userList.asObservable();
  }
}
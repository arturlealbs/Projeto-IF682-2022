import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ListUsersState } from './state/list-users.state';

import { User } from '../shared/types/User';

@Injectable()
export class ListUsersFacade {
	constructor(
		private readonly state: ListUsersState,
	) {}

    getUserList(): Observable<User[]> {
        return this.state.getUserList();
    }

    setUserList(userList: User[]) {
        this.state.setUserList(userList);
    }
}

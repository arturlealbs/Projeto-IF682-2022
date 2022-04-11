import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HomeState } from './state/home.state';
import { HomeApi } from './api/home.api';

import { User } from '../shared/types/User';
import { FacebookUser } from './types/facebook-user';

@Injectable()
export class HomeFacade {
	constructor(
		private readonly state: HomeState,
		private readonly api: HomeApi
	) {}

    getProfile(): Observable<User|null> {
        return this.state.getProfile();
    }

    setProfile(profile: User) {
        this.state.setProfile(profile);
    }

    getFacebookProfile(): Observable<FacebookUser> {
        return this.state.getFacebookProfile();
    }

    setFacebookProfile(profile: FacebookUser) {
        this.state.setFacebookProfile(profile);
    }
}

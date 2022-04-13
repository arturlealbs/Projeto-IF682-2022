import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HomeState } from './state/home.state';
import { HomeApi } from './api/home.api';

import { defaultUser, User } from '../shared/types/User';
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

    getFacebookProfileData(facebookID: string, accessToken: string) {
        this.api.getProfileData(facebookID, accessToken).subscribe(data => {
            const profile = this.state.getCurrentFacebookProfile();
            if (profile) {
                this.setFacebookProfile({
                    ...profile, 
                    gender: data.gender,
                    age: data.age_range.min,
                    birthday: data.birthday, 
                });
            }
        });
    }
}

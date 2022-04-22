import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HomeState } from './state/home.state';
import { HomeApi } from './api/home.api';

import { User } from '../shared/types/User';

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

    getFacebookProfileData(facebookID: string, accessToken: string) {
        this.api.getProfileData(facebookID, accessToken).subscribe(data => {
            const profile = this.state.getCurrentProfile();
            if (profile) {
                this.setProfile({
                    ...profile, 
                    gender: data.gender,
                    birthDate: data.birthday, 
                    age: data.age_range.min,
                });
            }
        });
    }
}

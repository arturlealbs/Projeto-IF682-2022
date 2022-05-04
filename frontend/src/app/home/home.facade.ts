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
        this.api.getFacebookData(facebookID, accessToken).subscribe(data => {
            const profile = this.state.getCurrentProfile();
            if (profile) {
                this.setProfile({
                    ...profile, 
                    gender: data.gender.toUpperCase(),
                    birthDate: data.birthday, 
                    age: data.age_range.min,
                    profileImg: data.picture.data.url
                });
            }
        });
    }
    
    getGoogleProfileData(accessToken: string) {
        this.api.getGoogleData(accessToken).subscribe(data => {
            const profile = this.state.getCurrentProfile();
            const resizedImage = data.picture.slice(
                0, data.picture.length - 5) + 's200-c';
            if (profile) {
                this.setProfile({
                    ...profile, 
                    firstName: data.firstName,
                    lastName: data.lastName,
                    username: data.username,
                    profileImg: resizedImage,
                });
            }
        });
    }
}

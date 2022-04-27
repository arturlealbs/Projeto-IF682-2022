import { APP_INITIALIZER } from '@angular/core';

import { UsersService } from '../shared/services/users.service';
import { ProfileService } from '../shared/services/profile.service';

export const homeInitializer = (
	usersService: UsersService,
	profileService: ProfileService,
) => () => {
	profileService.getProfile().subscribe(async (profile) => {
        const token = localStorage.getItem('TOKEN');
		
        if (!profile && token) {
            const profile = await usersService.getUser();
            profileService.setProfile(profile);
        }
	});
};

export const homeInitializerProvider = {
	provide: APP_INITIALIZER,
	useFactory: homeInitializer,
	multi: true,
	deps: [UsersService, ProfileService],
};

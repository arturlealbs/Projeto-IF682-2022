import { APP_INITIALIZER } from '@angular/core';
import { HomeFacade } from 'src/app/home/home.facade';
import { ProfileService } from '../shared/services/profile.service';
import { Router } from '@angular/router';

export const homeInitializer = (
	router: Router,
	homeFacade: HomeFacade,
	profileService: ProfileService
) => () => {
	profileService.getProfile().subscribe(profile => {
		if (profile === null) {
			router.navigate(['/login']);
		} 
	});

	homeFacade.getProfile().subscribe(profile => {
		if (profile !== null) {
			profileService.setProfile(profile);
		}
	});
};

export const homeInitializerProvider = {
	provide: APP_INITIALIZER,
	useFactory: homeInitializer,
	multi: true,
	deps: [Router, HomeFacade, ProfileService],
};

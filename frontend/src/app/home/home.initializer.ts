import { Router } from '@angular/router';
import { APP_INITIALIZER } from '@angular/core';

import { HomeFacade } from 'src/app/home/home.facade';
import { UsersService } from '../shared/services/users.service';

export const homeInitializer = (
	router: Router,
	homeFacade: HomeFacade,
	usersService: UsersService
) => () => {
};

export const homeInitializerProvider = {
	provide: APP_INITIALIZER,
	useFactory: homeInitializer,
	multi: true,
	deps: [Router, HomeFacade, UsersService],
};

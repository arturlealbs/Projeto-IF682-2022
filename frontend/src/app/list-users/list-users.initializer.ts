import { APP_INITIALIZER } from '@angular/core';

import { UsersService } from '../shared/services/users.service';
import { ProfileService } from '../shared/services/profile.service';
import { ListUsersFacade } from './list-users.facade';

export const listUsersInitializer = (
	usersService: UsersService,
	profileService: ProfileService,
	listUsersFacade: ListUsersFacade,
) => () => {
	profileService.getProfile().subscribe(async (profile) => {
        if (profile) {
			const users = await usersService.findAll();
			listUsersFacade.setUserList(users);
		}
	});
};

export const listUsersInitializerProvider = {
	provide: APP_INITIALIZER,
	useFactory: listUsersInitializer,
	multi: true,
	deps: [UsersService, ProfileService, ListUsersFacade],
};

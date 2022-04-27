import { APP_INITIALIZER } from '@angular/core';
import { ChatsFacade } from 'src/app/chats/chats.facade';
import { ProfileService } from '../shared/services/profile.service';

export const chatsInitializer = (
	chatsFacade: ChatsFacade,
	profileService: ProfileService
) => () => {
	profileService.getProfile().subscribe(profile => {
		if (profile) {
			chatsFacade.setProfile(profile)
			chatsFacade.fetchContacts();
		};
	});
};

export const chatsInitializerProvider = {
	provide: APP_INITIALIZER,
	useFactory: chatsInitializer,
	multi: true,
	deps: [ChatsFacade, ProfileService],
};

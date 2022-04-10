import { APP_INITIALIZER } from '@angular/core';
import { ChatsFacade } from 'src/app/chats/chats.facade';
import { ProfileService } from '../shared/services/profile.service';

export const chatsInitializer = (
	chatsFacade: ChatsFacade,
	profileService: ProfileService
) => () => {
	profileService.getUsername().subscribe(username => {
		chatsFacade.setUsername(username);
	});
};

export const chatsInitializerProvider = {
	provide: APP_INITIALIZER,
	useFactory: chatsInitializer,
	multi: true,
	deps: [ChatsFacade, ProfileService],
};

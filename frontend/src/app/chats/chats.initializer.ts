import { APP_INITIALIZER } from '@angular/core';
import { ChatsFacade } from 'src/app/chats/chats.facade';
import { ProfileService } from '../shared/services/profile.service';
import { MessageService } from './services/message.service';

export const chatsInitializer = (
	chatsFacade: ChatsFacade,
	profileService: ProfileService,
	messageService: MessageService,
) => () => {
	profileService.getProfile().subscribe(profile => {
		if (profile) {
			const token = localStorage.getItem('TOKEN') || "";
			messageService.renewToken(token);
			chatsFacade.setProfile(profile);
			chatsFacade.fetchContacts();
		};
	});
};

export const chatsInitializerProvider = {
	provide: APP_INITIALIZER,
	useFactory: chatsInitializer,
	multi: true,
	deps: [ChatsFacade, ProfileService, MessageService],
};

import { APP_INITIALIZER } from '@angular/core';
import { ChatsFacade } from 'src/app/chats/chats.facade';

export const chatsInitializer = (
	chatsFacade: ChatsFacade,
) => () => {};

export const chatsInitializerProvider = {
	provide: APP_INITIALIZER,
	useFactory: chatsInitializer,
	multi: true,
	deps: [ChatsFacade],
};

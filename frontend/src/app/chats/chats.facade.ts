import { MessageService } from './services/message.service';
import { ChatsState } from './state/chats.state';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import Message from './types/message';

@Injectable()
export class ChatsFacade {
	constructor(
		private readonly state: ChatsState,
		private messageService: MessageService
	) {
		this.messageService.messages.subscribe(message => {
			this.state.addMessage(message);
		});
		this.messageService.preview.subscribe(message => {
			this.state.setPreview(message);
		});
	}

	public getPreview(): Observable<Message|null> {
		return this.state.getPreview();
	}

	public getCurrentMessages(): Observable<Message[]> {
		return this.state.getMessages();
	}

	public setCurrentChat(username: string) {
		this.state.setChatMessages(username);
	}

	public sendMessage(message: string) {
		const username = this.state.getUsername();
		this.messageService.sendMessage({
			timestamp: Date.now(),
			username: username,
			text: message,
		});
	}

	public sendPreview(message: string) {
		const username = this.state.getUsername();
		this.messageService.sendPreview({
			timestamp: Date.now(),
			username: username,
			text: message,
		});
	}
}

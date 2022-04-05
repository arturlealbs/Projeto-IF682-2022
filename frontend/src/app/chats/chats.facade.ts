import { MessageService } from './services/message.service';
import { ChatsState } from './state/chats.state';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import Message from './types/message';
import Contact from './types/contact';

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

	public getUsername(): string {
		return this.state.getUsername();
	}

	public setUsername(username: string) {
		this.state.setUsername(username);
	}

	public getPreview(): Observable<Message|null> {
		return this.state.getPreview();
	}

	public getCurrentMessages(): Observable<Message[]> {
		return this.state.getMessages();
	}
	
	public getContacts(): Observable<Contact[]> {
		return this.state.getContacts();
	}

	public setCurrentChat(username: string) {
		this.state.setChatMessages(username);
	}

	public sendMessage(contact: string, message: string) {
		const username = this.state.getUsername();
		this.messageService.sendMessage({
			timestamp: Date.now(),
			from: username,
			text: message,
			to: contact,
		});
	}

	public sendPreview(contact: string, message: string) {
		const username = this.state.getUsername();
		this.messageService.sendPreview({
			timestamp: Date.now(),
			from: username,
			text: message,
			to: contact,
		});
	}
}

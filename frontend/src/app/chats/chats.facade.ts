import { MessageService } from './services/message.service';
import { ChatsState } from './state/chats.state';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import Message from './types/message';
import { Contact } from './types/contact';
import { User } from '../shared/types/User';

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

	public getProfile(): Observable<User> {
		return this.state.getProfile();
	}

	public setProfile(profile: User) {
		this.state.setProfile(profile);
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

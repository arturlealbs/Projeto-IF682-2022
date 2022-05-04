import { MessageService } from './services/message.service';
import { ChatsState } from './state/chats.state';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import Message from './types/message';
import { Contact } from './types/contact';
import { User } from '../shared/types/User';
import { UsersService } from '../shared/services/users.service';

@Injectable()
export class ChatsFacade {
	constructor(
		private readonly state: ChatsState,
		private usersService: UsersService,
		private messageService: MessageService
	) {
		this.messageService.messages.subscribe(message => {
			this.state.setPreview(null);
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

	public sendMessage(contactEmail: string, message: string) {
		const profileEmail = this.state.getProfileEmail();
		this.messageService.sendMessage({
			timestamp: Date.now(),
			from: profileEmail,
			to: contactEmail,
			text: message,
		});
	}

	public sendPreview(contactEmail: string, message: string) {
		const profileEmail = this.state.getProfileEmail();
		this.messageService.sendPreview({
			timestamp: Date.now(),
			from: profileEmail,
			to: contactEmail,
			text: message,
		});
	}

	public fetchContacts() {
		const profileEmail = this.state.getProfileEmail();
		this.usersService.getContacts().then(contacts => {
			this.state.setContacts(contacts.map(item => {
				const contact = item.infos.filter(info => (
					info.email !== profileEmail
				))[0];
				return {
					image: contact.profileImg,
					blocked: item.blocked,
					lastMessage: "",
					...contact
				};
			}));
		})
	}
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import ChatMessage from '../../types/chat-message';
import { ChatsFacade } from '../../chats.facade';
import { Subscription } from 'rxjs';

import { NotificationService } from 'src/app/shared/services/notification.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { defaultUser, User } from 'src/app/shared/types/User';
import { Contact, defaultContact } from '../../types/contact';
import Message from '../../types/message';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  public preview!: Message|null;
  public online: boolean = false;
  public messages: Message[] = [];
  public contacts: Contact[] = [];
  public chatMessages: ChatMessage[] = [];

  public profile: User = defaultUser;
  public contact: Contact = new defaultContact();
  
  private _messageSub!: Subscription;
  private _previewSub!: Subscription;

  constructor(
    private chatFacade: ChatsFacade,
    private usersService: UsersService,
    private notificationService: NotificationService
  ) {
    this.chatFacade.getProfile().subscribe(profile => {
      this.profile = profile;
    });
  }

  ngOnInit(): void {
    this.chatFacade.setCurrentChat(this.contact.username);

    const mObservable = this.chatFacade.getCurrentMessages();
    this._messageSub = mObservable.subscribe(messages => {
      this.messages = messages;
      this.chatMessages = this.renderMessages(messages);
    });

    const pObservable = this.chatFacade.getPreview();
    this._previewSub = pObservable.subscribe(message => {
      if (message !== null) {
        this.online = true;
      }
      this.preview = message;
    });

    this.chatFacade.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  ngOnDestroy(): void {
    if (this._messageSub) {
      this._messageSub.unsubscribe();
    }

    if (this._previewSub) {
      this._previewSub.unsubscribe();
    }
  }
  
  renderMessages(messages: Message[]): ChatMessage[] {
    const chatMessage: ChatMessage[] = [];
    if (messages.length === 0) {
      return chatMessage;
    }
    
    let lastUser: string = messages[0].from;
    let lastMessage: ChatMessage = {
      to: messages[0].to,
      from: messages[0].from,
      messages: []
    };

    for (const message of messages) {
      const timeToString = new Date(
        message.timestamp
      ).toLocaleString();
      
      if (message.from !== lastUser) {
        chatMessage.push(lastMessage);
        lastUser = message.from;
        lastMessage = {
          to: message.to,
          from: message.from,
          messages: []
        };
      }

      lastMessage.messages.push({
        text: message.text,
        timestamp: timeToString,
      });
    }
    chatMessage.push(lastMessage);
    return chatMessage;
  }

  sendPreview(value: string) {
    this.chatFacade.sendPreview(this.contact.email, value);
  }

  sendMessage(value: string) {
    this.chatFacade.sendMessage(this.contact.email, value);
    this.chatFacade.sendPreview(this.contact.email, "");
  }

  capitalizedName(username: string): string {
    return username.split(" ").map(
      (name) => name.charAt(0).toUpperCase() + name.slice(1)
    ).join(" ");
  }

  reportContact(reason: string) {
    this.usersService.updateRelationship(
      this.contact.email, true
    );
    
    const username = this.capitalizedName(this.profile.username);
    this.notificationService.sendNotification({
      to: this.contact.email,
      image: this.profile.profileImg,
      timestamp: new Date().toLocaleString(),
      text: `${username} reportou você pela seguinte razão: ${reason}.`
    });
    this.chatFacade.fetchContacts();
  }
  
  unlockContact() {
    this.usersService.updateRelationship(
      this.contact.email, false
    );
    
    const username = this.capitalizedName(this.profile.username);
    this.notificationService.sendNotification({
      to: this.contact.email,
      image: this.profile.profileImg,
      timestamp: new Date().toLocaleString(),
      text: `${username} gostaria de fazer as pazes.`
    });
    this.chatFacade.fetchContacts();
  }

  chooseContact(newContact: Contact) {
    this.contact = newContact;
    this.chatFacade.setCurrentChat(newContact.email);
  }
}

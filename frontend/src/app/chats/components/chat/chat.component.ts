import { Component, EventEmitter, Input, Output } from '@angular/core';

import { defaultUser, User } from '../../../shared/types/User';
import { Contact, defaultContact } from '../../types/contact';
import ChatMessage from '../../types/chat-message';
import Message from '../../types/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @Input()
  preview!: Message|null;
  
  @Input()
  online: boolean = false;
  
  @Input()
  messages: ChatMessage[] = [];

  @Input()
  profile: User = defaultUser;

  @Input()
  contact: Contact = new defaultContact();

  @Output()
  sendMessageEvent = new EventEmitter<string>();

  @Output()
  sendPreviewEvent = new EventEmitter<string>();
  
  message: { text: string } = {
    text: ''
  }

  constructor() {}

  hasPreview(): boolean { 
    return this.preview !== null && this.preview.text !== '' 
  };

  sendPreview({ target }: any) {
    this.sendPreviewEvent.emit(target.value);
  }

  sendMessage() {
    this.sendMessageEvent.emit(this.message.text);
    this.message.text = '';
  }

  messageSide(message: ChatMessage): string {
    return message.from === this.contact.username ?  'left' : 'right';
  }
  
  contactImage(message: ChatMessage): string {
    return message.from === this.contact.username ?  
      this.contact.image : this.profile.profileImg;
  }

  onlineStatus(): string {
    return this.online ? 'green' : 'red';
  }
}

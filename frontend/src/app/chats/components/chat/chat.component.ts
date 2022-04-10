import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  username: string = 'Username';

  @Input()
  contactUsername: string = "Contact";

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
}

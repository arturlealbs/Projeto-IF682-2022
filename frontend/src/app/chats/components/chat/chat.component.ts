import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  messages: Message[] = [];

  @Input()
  username: string = 'Username';

  @Input()
  contactUsername: string = "Contact";

  @Output()
  sendMessageEvent = new EventEmitter<string>();

  @Output()
  sendPreviewEvent = new EventEmitter<string>();

  constructor() { }

  hasPreview(): boolean { 
    return this.preview !== null && this.preview.text !== '' 
  };

  sendPreview({ target }: any) {
    this.sendPreviewEvent.emit(target.value);
  }

  sendMessage({ target }: any) {
    this.sendMessageEvent.emit(target.value);
  }
}

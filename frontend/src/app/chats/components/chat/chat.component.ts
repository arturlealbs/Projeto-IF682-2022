import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { ChatsFacade } from '../../chats.facade';
import Message from '../../types/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  preview!: Message|null;
  messages: Message[] = [];
  contactUsername: string = "";
  
  private _messageSub!: Subscription;
  private _previewSub!: Subscription;

  constructor(private chatFacade: ChatsFacade) { }

  ngOnInit(): void {
    this.chatFacade.setCurrentChat(this.contactUsername);
    const mObservable = this.chatFacade.getCurrentMessages();

    this._messageSub = mObservable.subscribe(messages => {
      this.messages = messages.map(message => ({
        ...message,
        timestamp: new Date(message.timestamp).toLocaleString()
      }));
    });

    const pObservable = this.chatFacade.getPreview();
    this._previewSub = pObservable.subscribe(message => {
      this.preview = message;
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

  sendPreview({ target }: any) {
    this.chatFacade.sendPreview(target.value);
  }

  sendMessage({ target }: any) {
    this.chatFacade.sendMessage(target.value);
  }
}

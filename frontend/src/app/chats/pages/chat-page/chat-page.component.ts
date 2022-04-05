import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../../shared/services/profile.service';
import { ChatsFacade } from '../../chats.facade';
import Message from '../../types/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  public preview!: Message|null;
  public online: boolean = false;
  public messages: Message[] = [];

  public username: string = 'Username';
  public contactUsername: string = "Daniel";
  
  private _messageSub!: Subscription;
  private _previewSub!: Subscription;

  constructor(
    private profileService: ProfileService,
    private chatFacade: ChatsFacade
  ) {
    this.profileService.getUsername().subscribe(username => {
      this.username = username;
    });
  }

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
      if (message !== null) {
        this.online = true;
      }
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

  sendPreview(value: string) {
    this.chatFacade.sendPreview(this.contactUsername, value);
  }

  sendMessage(value: string) {
    this.chatFacade.sendMessage(this.contactUsername, value);
  }
}

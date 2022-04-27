import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketIoModule } from 'ngx-socket-io';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { ContactsComponent } from './components/contacts/contacts.component';

import { chatsInitializerProvider } from './chats.initializer';
import { ChatsState } from './state/chats.state';
import { ChatsFacade } from './chats.facade';

import config from '../shared/config/socket';
import { MessageService } from './services/message.service';

@NgModule({
  providers: [ChatsState, MessageService, ChatsFacade, chatsInitializerProvider],
  declarations: [
    ChatComponent,
    ContactsComponent,
    ChatPageComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
		ChatsRoutingModule,
    SocketIoModule.forRoot(config)
  ]
})
export class ChatsModule { }

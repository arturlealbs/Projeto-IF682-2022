import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import Message from '../types/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages = this.socket.fromEvent<Message>("messages");
  preview = this.socket.fromEvent<Message>("preview");

  constructor(private socket: Socket) {}

  renewToken(newToken: string) {
    this.socket.ioSocket.io.opts.extraHeaders.authorization = newToken;
    this.socket.disconnect();
    this.socket.connect();
  }

  sendMessage(message: Message) {
    this.socket.emit('messages', message);
  }

  sendPreview(message: Message) {
    this.socket.emit('preview', message);
  }
}

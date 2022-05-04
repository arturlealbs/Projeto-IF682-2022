import {
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from './services/auth.service';

import { ChatService } from './services/chat.service';
import { Message } from './types/chat';
import { Notification } from './types/notification';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('connection')
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Client', client.id, 'connected');
    const token = client.handshake.headers.authorization;
    const tokenInfos = this.authService.verifyJWTToken(token);
    this.chatService.addSocket(tokenInfos.email, client);
    this.chatService.getChatMessages(tokenInfos.email).forEach((message) => {
      if (message.image) {
        client.emit('notifications', message);
      } else {
        client.emit('messages', message);
      }
    });
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() client: Socket) {
    const token = client.handshake.headers.authorization;
    const tokenInfos = this.authService.verifyJWTToken(token);
    this.chatService.addSocket(tokenInfos.email, client);
    this.chatService.removeSocket(tokenInfos.email);
    console.log('Disconnecting', tokenInfos.email);
  }

  @SubscribeMessage('messages')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: Message,
  ) {
    const token = client.handshake.headers.authorization;
    const tokenInfos = this.authService.verifyJWTToken(token);
    const isRelationship = await this.chatService.isRelationShip(
      tokenInfos.email,
      message.to,
    );
    if (isRelationship) {
      const socket = this.chatService.getSocket(message.to);
      if (socket) {
        socket.emit('messages', message);
      } else {
        this.chatService.addChat(message.to, message);
      }
      client.emit('messages', message);
    }
  }

  @SubscribeMessage('preview')
  async handlePreview(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: Message,
  ) {
    const token = client.handshake.headers.authorization;
    const tokenInfos = this.authService.verifyJWTToken(token);
    const isRelationship = await this.chatService.isRelationShip(
      tokenInfos.email,
      message.to,
    );
    if (isRelationship) {
      const socket = this.chatService.getSocket(message.to);
      if (socket) {
        socket.emit('preview', message);
      }
    }
  }

  @SubscribeMessage('notifications')
  handleNotifications(
    @ConnectedSocket() client: Socket,
    @MessageBody() notification: Notification,
  ) {
    const socket = this.chatService.getSocket(notification.to);
    if (socket) {
      socket.emit('notifications', notification);
    } else {
      this.chatService.addChat(notification.to, notification);
    }
  }
}

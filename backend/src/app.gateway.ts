import {
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('connection')
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Client', client.id, 'connected');
  }

  @SubscribeMessage('register')
  handleRegister(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    console.log('Client', client.id, 'registering', data);
  }

  @SubscribeMessage('messages')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    this.server.emit('messages', data);
  }

  @SubscribeMessage('preview')
  handlePreview(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    this.server.emit('preview', data);
  }

  @SubscribeMessage('notifications')
  handleNotifications(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    this.server.emit('notifications', data);
  }
}

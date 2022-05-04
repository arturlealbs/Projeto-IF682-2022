import { Socket } from 'socket.io';

export interface Message {
  to: string;
  from: string;
  text: string;
  timestamp: number;
}

export interface Sockets {
  [email: string]: Socket;
}

export interface NotificationMessage {
  to: string;
  text: string;
  from?: string;
  image?: string;
  timestamp: number | string;
}

export interface Chats {
  [from_to: string]: NotificationMessage[];
}

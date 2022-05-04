import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { Chats, Message, NotificationMessage, Sockets } from '../types/chat';
import { RelationshipsService } from '../relationships/relationships.service';
import { Notification } from '../types/notification';

@Injectable()
export class ChatService {
  private chats: Chats = {};
  private sockets: Sockets = {};
  private relationshipsCache: { [relationship: string]: number } = {};

  constructor(private relationshipsService: RelationshipsService) {}

  private getIdentifier(from: string, to: string): string {
    return [from, to].sort().join('_');
  }

  async isRelationShip(from: string, to: string): Promise<boolean> {
    const identifier = this.getIdentifier(from, to);
    const cached = this.relationshipsCache[identifier];
    if (cached) {
      const expirationTime = (Date.now() - cached) / 1000;
      if (expirationTime < 60) {
        return true;
      }
    }

    const relationship = await this.relationshipsService.findOne({
      email: from,
      contactEmail: to,
    });
    let hasARelationship = false;
    if (relationship) {
      hasARelationship = !relationship.blocked;
    }
    if (hasARelationship) {
      this.relationshipsCache[identifier] = new Date().getTime();
    }
    return hasARelationship;
  }

  addChat(contact: string, message: Message | Notification): void {
    const chat = this.chats[contact];
    if (!chat) {
      this.chats[contact] = [];
    }
    this.chats[contact].push(message);
  }

  getChatMessages(contact: string): NotificationMessage[] {
    const filtered = this.chats[contact];
    this.chats[contact] = [];
    return filtered ? filtered : [];
  }

  addSocket(email: string, socket: Socket): void {
    this.sockets[email] = socket;
  }

  removeSocket(email: string) {
    delete this.sockets[email];
  }

  getSocket(email: string): Socket | null {
    return this.sockets[email];
  }
}

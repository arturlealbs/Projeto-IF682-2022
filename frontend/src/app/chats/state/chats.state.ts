import { BehaviorSubject, map, Observable, Subscription } from "rxjs";
import { Injectable } from "@angular/core";

import Message from "../types/message";
import { Contact } from "../types/contact";
import { User, defaultUser } from "../../shared/types/User";

@Injectable({ providedIn: 'root' })
export class ChatsState {
  private profile: BehaviorSubject<User> = new BehaviorSubject<User>(defaultUser);
  private messageSubscription!: Subscription;

  private readonly preview = new BehaviorSubject<Message|null>(null);
  private readonly currentMessages = new BehaviorSubject<Message[]>([]);
  private readonly messages = new BehaviorSubject<Message[]>([]);
  private readonly contacts = new BehaviorSubject<Contact[]>([]);

  public setChatMessages(username: string) {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    this.messageSubscription = this.messages.pipe(
      map(messages => messages.filter(message => 
        message.from === username || message.to === username
    ))).subscribe(
      messages => this.currentMessages.next(messages)
    );
  }

  public addMessage(message: Message) {
    this.contacts.next(this.contacts.getValue().map(contacts => {
      if (contacts.username === message.from) {
        contacts.lastMessage = message.text;
      }
      return contacts;
    }));
    this.messages.next([...this.messages.getValue(), message]);
  }

  public getMessages(): Observable<Message[]> {
    return this.currentMessages.asObservable();
  }

  public setPreview(message: Message|null) {
    return this.preview.next(message);
  }
  
  public getPreview(): Observable<Message|null> {
    const username = this.profile.getValue().username;
    return this.preview.asObservable().pipe(
      map(message => message?.from !== username ? message : null)
    );
  }

  public getContacts(): Observable<Contact[]> {
    return this.contacts.asObservable();
  }
  
  public setContacts(newContacts: Contact[]) {
    return this.contacts.next(newContacts);
  }

  public getProfileEmail(): string {
    return this.profile.getValue().email;
  }

  public getProfile(): Observable<User> {
    return this.profile.asObservable();
  }

  public setProfile(profile: User) {
    this.profile.next(profile);
  }
}
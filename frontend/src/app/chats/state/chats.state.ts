import { BehaviorSubject, map, Observable, Subscription } from "rxjs";
import { Injectable } from "@angular/core";

import Message from "../types/message";

@Injectable({ providedIn: 'root' })
export class ChatsState {
  private username: string = "";

  private messageSubscription!: Subscription;
  private readonly messages = new BehaviorSubject<Message[]>([
    {
      to: 'Daniel',
      from: 'Danilo',
      text: 'Olá, tudo bem?',
      timestamp: new Date().toLocaleString()
    },
    {
      to: 'Danilo',
      from: 'Daniel',
      text: 'Isso é um texto qualquer',
      timestamp: new Date().toLocaleString()
    },
    {
      to: 'Danilo',
      from: 'Daniel',
      text: 'Outro texto qualquer',
      timestamp: new Date().toLocaleString()
    },
    {
      to: 'Daniel',
      from: 'Danilo',
      text: 'Essa é a última mensagem salva',
      timestamp: new Date().toLocaleString()
    },
    {
      to: 'Another',
      from: 'Danilo',
      text: 'Essa mensagem precisa ser filtrada',
      timestamp: new Date().toLocaleString()
    },
  ]);
  private readonly preview = new BehaviorSubject<Message|null>(null);
  private readonly currentMessages = new BehaviorSubject<Message[]>([]);

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
    this.messages.next([...this.messages.getValue(), message]);
  }

  public getMessages(): Observable<Message[]> {
    return this.currentMessages.asObservable();
  }

  public setPreview(message: Message) {
    return this.preview.next(message);
  }
  
  public getPreview(): Observable<Message|null> {
    return this.preview.asObservable().pipe(
      map(message => message?.from !== this.username ? message : null)
    );
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string) {
    this.username = username;
  }
}
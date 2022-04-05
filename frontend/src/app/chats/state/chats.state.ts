import { BehaviorSubject, map, Observable, Subscription } from "rxjs";
import { Injectable } from "@angular/core";

import Message from "../types/message";
import Contact from "../types/contact";

@Injectable({ providedIn: 'root' })
export class ChatsState {
  private username: string = "";
  private messageSubscription!: Subscription;

  private readonly preview = new BehaviorSubject<Message|null>(null);
  private readonly currentMessages = new BehaviorSubject<Message[]>([]);
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
  
  private readonly contacts = new BehaviorSubject<Contact[]>([
    {
      username: 'Daniel',
      lastMessage: "Uma mensagem muito grande para caber nesse local",
      image: "https://fomantic-ui.com/images/avatar/small/daniel.jpg"
    },
    {
      username: 'Helen',
      lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut justo a dui rutrum vulputate. Nunc commodo quam purus, non molestie nulla tincidunt at. Pellentesque volutpat nulla quis massa sagittis volutpat. Duis malesuada nibh sed nibh auctor efficitur. Integer condimentum ut magna quis pellentesque. Quisque quis turpis laoreet, molestie lorem eu, cursus orci. Aliquam volutpat lorem mauris, ac tincidunt neque fringilla non. Morbi eget tristique sem, vel bibendum arcu.",
      image: "https://fomantic-ui.com/images/avatar/small/helen.jpg"
    },
    {
      username: 'Christian',
      lastMessage: "Última mensagem enviada",
      image: "https://fomantic-ui.com/images/avatar/small/christian.jpg"
    }
  ]);

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

  public getContacts(): Observable<Contact[]> {
    return this.contacts.asObservable();
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string) {
    this.username = username;
  }
}
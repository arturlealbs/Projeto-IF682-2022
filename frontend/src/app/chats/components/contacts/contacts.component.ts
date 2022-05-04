import { Component, EventEmitter, Input, Output } from '@angular/core';
import { defaultUser, User } from '../../../shared/types/User';
import { Contact } from '../../types/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  
  @Input()
  contacts: Contact[] = [];
  
  @Input()
  profile: User = defaultUser;

  @Output()
  chooseContactEvent = new EventEmitter<Contact>();

  constructor() { }

  capitalizedName(username: string): string {
    return username.split(" ").map(
      (name) => name.charAt(0).toUpperCase() + name.slice(1)
    ).join(" ");
  }

  chooseContact(newContact: Contact) {
    this.chooseContactEvent.emit(newContact);
  }
}

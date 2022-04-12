import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { defaultUser, User } from '../../../shared/types/User';
import { Contact } from '../../types/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  
  @Input()
  contacts: Contact[] = [];
  
  @Input()
  profile: User = defaultUser;

  @Output()
  chooseContactEvent = new EventEmitter<Contact>();

  constructor() { }

  ngOnInit(): void {
  }

  chooseContact(newContact: Contact) {
    this.chooseContactEvent.emit(newContact);
  }
}

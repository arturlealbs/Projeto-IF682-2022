import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Contact from '../../types/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  
  @Input()
  contacts: Contact[] = [];

  @Output()
  chooseContactEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  chooseContact(username: string) {
    this.chooseContactEvent.emit(username);
  }
}

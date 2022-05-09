import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { defaultUser, User } from 'src/app/shared/types/User';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() public profile: User = defaultUser;

  @Input() displayInputs: string[] = [
    "username", "firstName", "lastName", 
    "email", "gender", "age", "occupation",
    "education", "bio", "interests", "city",
    "state", "address", "birthDate", "phoneNumber",
    "genderOfInterest"
  ];
  @Input() actionLabel: string = 'Cadastrar';
  @Output() onSubmit = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.onSubmit.emit(this.profile);
  }
}

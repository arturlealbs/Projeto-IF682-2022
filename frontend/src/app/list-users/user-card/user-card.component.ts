import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Rate } from '../types/rate';
import User from "../types/user"
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  constructor() { }
  
  @Output() showRequest = new EventEmitter<User>();
  @Output() rateRequest = new EventEmitter<Rate>();


  ngOnInit(): void {

  }

  requestShowModal = () => {
    this.showRequest.emit(this.user) 
  }

  requestRateUser = (action: string) => {
    const rate: Rate = {user: this.user, action}
    this.rateRequest.emit(rate)
  }
  @Input() user?: User;
}

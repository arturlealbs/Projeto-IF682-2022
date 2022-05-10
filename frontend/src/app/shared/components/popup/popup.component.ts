import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() label: string = '';
  public className: string = 'hide';

  constructor() { }

  ngOnInit(): void {
  }

  showPopUp() {
    this.className = "show showAlert";
    setTimeout(() => {
      this.className = "hide showAlert";
    },5000);
  };
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() identifier: string = '';
  @Input() label: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  className() {
    return this.label.replace(' ', '-').toLowerCase();
  }

  showPopUp() {
    $(`.alert.${this.identifier}`).addClass("show");
    $(`.alert.${this.identifier}`).removeClass("hide");
    $(`.alert.${this.identifier}`).addClass("showAlert");
    setTimeout(function(){
      $(`.alert`).removeClass("show");
      $(`.alert`).addClass("hide");
    },5000);
  };
}

import { Component } from '@angular/core';
declare var $:JQueryStatic;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'boilerplate';
  constructor() {
    console.log("testing-jquery: " + $('.poke-infos'))
    $('.poke-infos').hide();
  }
}

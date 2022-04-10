import { Component } from '@angular/core';
import { ProfileService } from './shared/services/profile.service';
declare var $:JQueryStatic;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'Coopido';
  constructor(private profileService: ProfileService) {
    $('.poke-infos').hide();
  }

  setUsername(event: any) {
    this.profileService.setUsername(event.target.value);
  }
}

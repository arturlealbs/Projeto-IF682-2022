import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileService } from './services/profile.service';
import { HeaderComponent } from './components/header/header.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

import { environment } from '../../environments/environment';
import { 
  SocialAuthServiceConfig,
  FacebookLoginProvider, 
  SocialLoginModule, 
} from '@abacritt/angularx-social-login';

const fbLoginOptions = {
  scope: 'email,public_profile,user_age_range,user_birthday,user_gender', // ,user_photos
  return_scopes: true,
  enable_profile_selector: true
};

@NgModule({
  providers: [
    ProfileService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              environment.facebookID,
              fbLoginOptions
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
  ],
  declarations: [
    HeaderComponent,
    NotificationsComponent
  ],
  imports: [
    SocialLoginModule,
    CommonModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  exports: [
    NotificationsComponent,
    HeaderComponent,
    CommonModule,
    BrowserModule,
  ],
})
export class SharedModule { }

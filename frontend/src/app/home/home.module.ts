import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeApi } from './api/home.api';
import { HomeFacade } from './home.facade';
import { HomeRoutingModule } from './home-routing.module';
import { homeInitializerProvider } from './home.initializer';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';

import { ProfileComponent } from './pages/profile/profile.component';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { environment } from '../../environments/environment';
import { 
  SocialAuthServiceConfig,
  FacebookLoginProvider, 
  SocialLoginModule, 
} from 'angularx-social-login';

const fbLoginOptions = {
  scope: 'email,public_profile,user_age_range,user_birthday,user_gender', // ,user_photos
  return_scopes: true,
  enable_profile_selector: true
};

@NgModule({
	providers: [
    HomeFacade, 
    HomeApi, 
    homeInitializerProvider,
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
    }    
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    SigninComponent,
    ProfileComponent
  ],
  imports: [
    SocialLoginModule,
    CommonModule,
    FormsModule,
		SharedModule,
		HomeRoutingModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class HomeModule { }

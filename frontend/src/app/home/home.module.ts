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

import { environment } from '../../environments/environment';
import { 
  SocialAuthServiceConfig,
  FacebookLoginProvider, 
  SocialLoginModule, 
} from 'angularx-social-login';

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
              environment.facebookID
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }    
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    SigninComponent
  ],
  imports: [
    SocialLoginModule,
    CommonModule,
    FormsModule,
		SharedModule,
		HomeRoutingModule,
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { HomeApi } from './api/home.api';
import { HomeFacade } from './home.facade';
import { HomeRoutingModule } from './home-routing.module';
import { homeInitializerProvider } from './home.initializer';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
	providers: [
    HomeFacade, 
    HomeApi, 
    homeInitializerProvider,   
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    SigninComponent,
    ProfileComponent,
    PolicyComponent,
    PrivacyComponent,
    UserFormComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
		SharedModule,
		HomeRoutingModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class HomeModule { }

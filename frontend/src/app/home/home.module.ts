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
    ProfileComponent
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

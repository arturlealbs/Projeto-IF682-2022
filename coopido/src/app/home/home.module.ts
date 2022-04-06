import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { InfosComponent } from './components/infos/infos.component';

import { HomeApi } from './api/home.api';
import { HomeFacade } from './home.facade';
import { HomeRoutingModule } from './home-routing.module';
import { homeInitializerProvider } from './home.initializer';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';

@NgModule({
	providers: [HomeFacade, HomeApi, homeInitializerProvider],
  declarations: [
    HomeComponent,
    InfosComponent,
    LoginComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
		SharedModule,
		HomeRoutingModule,
  ]
})
export class HomeModule { }

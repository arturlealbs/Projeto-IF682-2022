import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/header/header.component';

import { GraphQLModule } from './modules/graphql.module';
import { SocialModule } from './modules/social.module';
import { SocketIoModule } from 'ngx-socket-io';

import { UsersService } from './services/users.service';
import { ProfileService } from './services/profile.service';
import { NotificationService } from './services/notification.service';

import config from './config/socket';
import { PopupComponent } from './components/popup/popup.component';


@NgModule({
  providers: [
    NotificationService,
    ProfileService,
    UsersService,
  ],
  declarations: [HeaderComponent, PopupComponent],
  imports: [
    RouterModule,
    SocialModule,
    CommonModule,
    GraphQLModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config)
  ],
  exports: [
    HeaderComponent,
    PopupComponent,
    CommonModule,
    BrowserModule,
  ],
})
export class SharedModule { }

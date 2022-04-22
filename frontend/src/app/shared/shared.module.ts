import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileService } from './services/profile.service';
import { HeaderComponent } from './components/header/header.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SocialModule } from './modules/social.module';
import { GraphQLModule } from './modules/graphql.module';
import { UsersService } from './services/users.service';


@NgModule({
  providers: [
    ProfileService,
    UsersService,
  ],
  declarations: [
    HeaderComponent,
    NotificationsComponent
  ],
  imports: [
    RouterModule,
    SocialModule,
    CommonModule,
    GraphQLModule,
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

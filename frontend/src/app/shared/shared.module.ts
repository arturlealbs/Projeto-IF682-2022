import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileService } from './services/profile.service';
import { HeaderComponent } from './components/header/header.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

@NgModule({
  providers: [ProfileService],
  declarations: [
    HeaderComponent,
    NotificationsComponent
  ],
  imports: [
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

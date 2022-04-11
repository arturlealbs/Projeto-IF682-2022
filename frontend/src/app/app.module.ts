import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { HomeModule } from './home/home.module';
import { ChatsModule } from './chats/chats.module';
import { SharedModule } from './shared/shared.module';

import { HeaderComponent } from './shared/components/header/header.component';
import { NotificationsComponent } from './shared/components/notifications/notifications.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
		CoreModule,
    HomeModule,
    ChatsModule,
    HeaderComponent,
    NotificationsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

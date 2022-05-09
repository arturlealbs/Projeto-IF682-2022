import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { HomeModule } from './home/home.module';
import { ChatsModule } from './chats/chats.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FomanticUIModule } from 'ngx-fomantic-ui';
import { ListUsersModule } from './list-users/list-users.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
		CoreModule,
    HomeModule,
    ChatsModule,
    ListUsersModule,
    HttpClientModule,
    FomanticUIModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

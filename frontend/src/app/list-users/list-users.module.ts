import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListUsersRoutingModule } from './list-users-routing.module';
import { PageComponent } from './page/page.component';
import { SimilarUsersComponent } from './similar-users/similar-users.component';
import { UserCardComponent } from './user-card/user-card.component';


@NgModule({
  declarations: [
    PageComponent,
    SimilarUsersComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    ListUsersRoutingModule
  ]
})
export class ListUsersModule { }

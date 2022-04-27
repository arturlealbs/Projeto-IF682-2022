import { ModalDetailsComponent } from './modal-details/modal-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimilarUsersComponent } from './similar-users/similar-users.component';
import { ListUsersRoutingModule } from './list-users-routing.module';
import { UserCardComponent } from './user-card/user-card.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PageComponent } from './page/page.component';
import { FuiModalModule } from 'ngx-fomantic-ui';

@NgModule({
  declarations: [
    PageComponent,
    SimilarUsersComponent,
    UserCardComponent,
    ModalDetailsComponent,
  ],
  
  imports: [
    CommonModule,
    SlickCarouselModule,
    ListUsersRoutingModule,
    FuiModalModule,
  ],
})
export class ListUsersModule {}

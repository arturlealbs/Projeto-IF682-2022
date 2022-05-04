import { ModalDetailsComponent } from './components/modal-details/modal-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimilarUsersComponent } from './components/similar-users/similar-users.component';
import { ListUsersRoutingModule } from './list-users-routing.module';
import { UserCardComponent } from './components/user-card/user-card.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PageComponent } from './page/page.component';
import { FuiModalModule } from 'ngx-fomantic-ui';

import { ListUsersState } from './state/list-users.state';
import { ListUsersFacade } from './list-users.facade';
import { listUsersInitializerProvider } from './list-users.initializer';

@NgModule({
  providers: [
    ListUsersState,
    ListUsersFacade,
    listUsersInitializerProvider,
  ],
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

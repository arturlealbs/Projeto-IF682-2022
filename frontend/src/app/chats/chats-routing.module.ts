import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';

import { 
  AuthGuardService as AuthGuard 
} from '../core/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: 'chats',
    component: ChatPageComponent,
    canActivate: [AuthGuard], 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';

const routes: Routes = [
  {
    path: 'chats',
    component: ChatPageComponent,
    data: {
      id: 'chat',
      icon: 'chat', 
      title: 'Conversas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }

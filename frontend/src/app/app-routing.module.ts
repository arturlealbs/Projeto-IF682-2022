import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from './shared/components/notifications/notifications.component';

const routes: Routes = [
  {
    path: 'list', 
    loadChildren: () => import('./list-users/list-users.module').then(m => m.ListUsersModule)
  },
  {
    path: 'notifications', 
    component: NotificationsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

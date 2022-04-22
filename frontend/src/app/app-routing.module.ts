import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
  AuthGuardService as AuthGuard 
} from './core/auth-guard/auth-guard.service';
import { 
  NotificationsComponent 
} from './shared/components/notifications/notifications.component';

const routes: Routes = [
  {
    path: 'list', 
    canActivate: [AuthGuard], 
    loadChildren: () => import('./list-users/list-users.module').then(m => m.ListUsersModule)
  },
  {
    path: 'notifications', 
    canActivate: [AuthGuard], 
    component: NotificationsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

import { 
  AuthGuardService as AuthGuard 
} from '../core/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'policy',
    component: PolicyComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard], 
    component: ProfileComponent
  },
  {
    path: 'notifications', 
    canActivate: [AuthGuard], 
    component: NotificationsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

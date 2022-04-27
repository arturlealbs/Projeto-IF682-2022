import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';

import { 
  AuthGuardService as AuthGuard 
} from '../core/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: 'list',
    canActivate: [AuthGuard], 
    component: PageComponent  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListUsersRoutingModule { }

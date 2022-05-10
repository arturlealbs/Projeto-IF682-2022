import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public jwtHelper: JwtHelperService, 
    public router: Router
  ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('TOKEN');

    if (!token || this.jwtHelper.isTokenExpired(token)) {
      if (this.router.url.includes('signin')) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
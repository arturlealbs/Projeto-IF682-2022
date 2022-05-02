import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.req.headers.authorization;
    if (!token) {
      return false;
    }

    const data = this.authService.verifyJWTToken(token);
    ctx.tokenInfo = data;

    if (data.auth) return true;

    return false;
  }
}

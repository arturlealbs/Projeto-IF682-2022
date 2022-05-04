import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FacebookGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.req.headers.authorization;
    if (!token) {
      return false;
    }

    const { data: validation } = await firstValueFrom(
      this.authService.verifyFBToken(token),
    );

    if (validation.data.is_valid) {
      const { data } = await firstValueFrom(
        this.authService.getFBEmail(validation.data.user_id, token),
      );

      ctx.email = data.email;
      ctx.token = this.authService.createJWTToken(data.email);
      return true;
    } else {
      const { data } = await firstValueFrom(this.authService.getGGEmail(token));
      if (data) {
        ctx.email = data.email;
        ctx.token = this.authService.createJWTToken(data.email);
        return true;
      }
    }
    return false;
  }
}

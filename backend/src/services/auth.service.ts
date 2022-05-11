import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { catchError, Observable, of, tap } from 'rxjs';

import { FBToken } from '../users/types/fb-token';
import { JwtPayload, verify as jwtVerify, sign as jwtSign } from 'jsonwebtoken';
import TokenInfo from '../users/types/token-info';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  verifyFBToken(token: string): Observable<AxiosResponse<FBToken>> {
    return this.httpService.get('https://graph.facebook.com/debug_token', {
      params: {
        input_token: token,
        access_token: process.env.FB_TOKEN,
      },
    });
  }

  getGGEmail(token: string) {
    // It's not secure yet
    return this.httpService
      .get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
        params: {
          access_token: token,
        },
      })
      .pipe(
        tap((response: AxiosResponse) => of(response.data.email)),
        catchError(() => of({ data: null })),
      );
  }

  getFBEmail(userID: string, token: string) {
    return this.httpService
      .get<{ email: string }>(
        `https://graph.facebook.com/${userID}?fields=email&access_token=${token}`,
      )
      .pipe(tap((response: AxiosResponse) => of(response.data.email)));
  }

  createJWTToken(email: string) {
    const oneDayInSeconds = 60 * 60 * 24;
    const token = jwtSign({ email }, process.env.SECRET, {
      expiresIn: oneDayInSeconds,
    });
    return token;
  }

  verifyJWTToken(token: string): TokenInfo {
    if (!token)
      return {
        email: '',
        auth: false,
        message: 'No token provided.',
      };

    try {
      const response = jwtVerify(token, process.env.SECRET) as JwtPayload;
      return {
        auth: true,
        email: response.email,
        message: 'Authenticated',
      };
    } catch (error) {
      return {
        email: '',
        auth: false,
        message: 'Failed to authenticate token.',
      };
    }
  }
}

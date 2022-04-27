import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const token = localStorage.getItem('TOKEN') || "DANILO!!!";
		if (!token) {
			return next.handle(req);
		}

		const cacheReq = req.clone({
			setHeaders: { Authorization: token },
		});
		return next.handle(cacheReq);
	}
}

export const TokenInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: TokenInterceptor,
	multi: true,
};

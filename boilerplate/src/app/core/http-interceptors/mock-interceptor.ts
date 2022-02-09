import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

const MOCK_VALUE = 'mock';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const cacheReq = req.clone({
			setHeaders: { MockValue: MOCK_VALUE },
		});
		return next.handle(cacheReq);
	}
}

export const MockInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: MockInterceptor,
	multi: true,
};

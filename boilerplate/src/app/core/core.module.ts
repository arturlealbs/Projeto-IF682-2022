import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpInterceptorsProvider } from './http-interceptors';

@NgModule({
	providers: [
		...HttpInterceptorsProvider,
		{ provide: LOCALE_ID, useValue: 'pt-BR' },
	],
})
export class CoreModule {}

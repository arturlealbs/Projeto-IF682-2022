import { APP_INITIALIZER } from '@angular/core';
import { HomeFacade } from 'src/app/home/home.facade';

export const homeInitializer = (
	homeFacade: HomeFacade,
) => () => {
	homeFacade.fetchInfos("bulbasaur");
};

export const homeInitializerProvider = {
	provide: APP_INITIALIZER,
	useFactory: homeInitializer,
	multi: true,
	deps: [HomeFacade],
};

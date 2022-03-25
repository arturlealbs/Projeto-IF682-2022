import { Injectable } from '@angular/core';
import { HomeApi } from './api/home.api';
import { HomeState } from './state/home.state';

@Injectable()
export class HomeFacade {
	constructor(
		private readonly state: HomeState,
		private readonly api: HomeApi
	) {}

    public fetchInfos(name: string) {
        this.api.fetchInfos(name).subscribe(infos => {
            this.state.setInfos(infos);
        });
    }

	public getInfos() {
		return this.state.getInfos();
    }
}

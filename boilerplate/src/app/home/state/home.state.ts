import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Infos } from "../types/infos";

@Injectable({ providedIn: 'root' })
export class HomeState {
  private readonly infos = new BehaviorSubject<Infos>({
    id: -1, name: "", image: "",
    height: -1, weight: -1,
    base_experience: -1,
  });

  public getInfos() {
    return this.infos.asObservable();
  }

  public setInfos(newInfo: Infos) {
    this.infos.next(newInfo);
  }
}
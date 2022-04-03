import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

import { Infos } from "../types/infos";
import { InfosData } from "../types/infosData";

@Injectable()
export class HomeApi {
  public constructor(private readonly http: HttpClient) { }

  public fetchInfos(name: string): Observable<Infos> {
    return this.http.get<InfosData>(
        `https://pokeapi.co/api/v2/pokemon/${name}/`
    ).pipe(map((infos) => {
        return {
            id: infos.id,
            name: infos.name,
            height: infos.height,
            weight: infos.weight,
            base_experience: infos.base_experience,
            image: infos.sprites.other["official-artwork"].front_default,
        }
    }), catchError((error: HttpErrorResponse) => {
        console.error(error.message);
        return of({
            id: -1, name: "", image: "",
            height: -1, weight: -1,
            base_experience: -1
        });
    }));
  }
}
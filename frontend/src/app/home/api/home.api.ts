import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FacebookProfile } from "../state/facebook-data";

@Injectable()
export class HomeApi {
  public constructor(private readonly http: HttpClient) { }

  public getProfileData(facebookID:string, accessToken: string, 
    fields: string[] = ["age_range", "birthday", "gender"]
  ): Observable<FacebookProfile> {
    const fieldString = fields.join(",");
    return this.http.get<FacebookProfile>(
      `https://graph.facebook.com/${facebookID}?fields=${fieldString}&access_token=${accessToken}`
    );
  }
}
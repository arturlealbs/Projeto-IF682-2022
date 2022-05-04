import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FacebookProfile, GoogleProfile } from "../types/login-data";

@Injectable()
export class HomeApi {
  public constructor(private readonly http: HttpClient) { }

  public getFacebookData(facebookID:string, accessToken: string, 
    fields: string[] = ["age_range", "birthday", "gender", "picture.type(large)"],
  ): Observable<FacebookProfile> {
    const fieldString = fields.join(",");
    return this.http.get<FacebookProfile>(
      `https://graph.facebook.com/${facebookID}?fields=${fieldString}&access_token=${accessToken}`
    );
  }
  
  public getGoogleData(accessToken: string): Observable<GoogleProfile> {
    return this.http.get<GoogleProfile>(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
    );
  }
}
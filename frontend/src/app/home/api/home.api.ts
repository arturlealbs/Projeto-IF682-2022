import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HomeApi {
  public constructor(private readonly http: HttpClient) { }
}
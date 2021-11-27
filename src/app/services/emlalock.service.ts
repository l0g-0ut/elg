import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiData} from "../model/api-data";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class EmlalockService {

  public addTime(seconds: number, apiData: ApiData): Observable<any> {
    return this.http.get<any>('https://api.emlalock.com/add', {
      headers: {
        'Accept': 'application/json',
      },
      params: {
        'userid': apiData.apiUser,
        'apikey': apiData.apiKey,
        'value': seconds,
      }
    });
  }

  public addRequirements(num: number, apiData: ApiData): Observable<any> {
    return this.http.get<any>('https://api.emlalock.com/addrequirement', {
      headers: {
        'Accept': 'application/json',
      },
      params: {
        'userid': apiData.apiUser,
        'apikey': apiData.apiKey,
        'value': num,
      }
    });
  }

  constructor(private http: HttpClient) {
  }

}

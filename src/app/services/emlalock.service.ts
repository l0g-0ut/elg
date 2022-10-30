import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiData} from "../model/api-data";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class EmlalockService {

  public addTime(seconds: number, apiData: ApiData, message?: string): Observable<any> {
    let params: {[key: string]: string|number} = {
      'userid': apiData.apiUser,
      'apikey': apiData.apiKey,
      'value': seconds,
    }
    if (message) {
      let userMessage: string = message + " ";
      let addMessage: string = "";
      do {
        userMessage = userMessage.slice(0, -1);
        addMessage = encodeURIComponent(userMessage);
      } while (addMessage.length > 49);
      params['text'] = userMessage;
    }
    return this.http.get<any>('https://api.emlalock.com/add', {
      headers: {
        'Accept': 'application/json',
      },
      params: params,
    });
  }

  public addMinimumTime(seconds: number, apiData: ApiData): Observable<any> {
    return this.http.get<any>('https://api.emlalock.com/addminimum', {
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

  public addMaximumTime(seconds: number, apiData: ApiData): Observable<any> {
    return this.http.get<any>('https://api.emlalock.com/addmaximum', {
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

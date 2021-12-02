import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


export interface ShortUrlResult {
  code?: string;
  short_link?: string;
  full_short_link: string;
  short_link2?: string;
  full_short_link2?: string;
  share_link?: string;
  full_share_link?: string;
  original_link?: string;
}

export interface ShortUrlResponse {
  ok: boolean;
  result?: ShortUrlResult;
  error_code?: number;
}


@Injectable({
  providedIn: 'root',
})
export class UrlShortenerService {

  public buildShortUrl(longUrl: string): Observable<ShortUrlResponse> {
    return this.http.get<ShortUrlResponse>('https://api.shrtco.de/v2/shorten', {
      headers: {
        'Accept': 'application/json',
      },
      params: {
        'url': longUrl,
      },
    });
  }

  constructor(private http: HttpClient) {
  }

}

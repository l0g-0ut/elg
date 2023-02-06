import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


export interface MinMax {
  min: number;
  max: number;
}

export interface MinMaxFix extends MinMax {
  fix: number | null;
}

export interface MinMaxEnabled extends MinMax {
  enabled: boolean;
}

export interface PenaltyData {
  time: MinMaxEnabled;
  minimumTime: MinMaxEnabled;
  requirements: MinMaxEnabled;
}

export interface ProfileData {
  inFeelingLucky: boolean;
  iterations: MinMaxFix;
  sleeps: MinMax;
  penalty: PenaltyData;
  overrideMaximumTime?: boolean;
}

export interface ProfileResponse {
  [profileName: string]: ProfileData;
}


@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  public getProfiles(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>('assets/profiles.json');
  }

  constructor(private http: HttpClient) {
  }

}

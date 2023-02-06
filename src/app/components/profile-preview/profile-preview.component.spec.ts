import {TestBed} from "@angular/core/testing";
import {ProfilePreviewComponent} from "./profile-preview.component";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfileResponse} from "../../services/profile.service";


const profileData = {
  "\uD83D\uDE18 Teaser": {
    "inFeelingLucky": false,
    "overrideMaximumTime": false,
    "iterations": {
      "min": 0,
      "max": 0,
      "fix": 1
    },
    "sleeps": {
      "min": 10,
      "max": 20
    },
    "penalty": {
      "time": {
        "enabled": true,
        "min": 10,
        "max": 120
      },
      "minimumTime": {
        "enabled": false,
        "min": 1,
        "max": 3600
      },
      "requirements": {
        "enabled": false,
        "min": 0,
        "max": 0
      }
    }
  }
};

class TestHttpClient {
  get(url: string): Observable<ProfileResponse> {
    if (url === 'assets/profiles.json') {
      return new Observable<ProfileResponse>((subscriber) => {
        subscriber.next(profileData);
      });
    }
    else {
      return new Observable<ProfileResponse>((subscriber) => {
        subscriber.error(`Not Found: ${url}`);
      });
    }
  }
}

describe("Profile Preview Component", () => {

  let component: ProfilePreviewComponent;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfilePreviewComponent,
        { provide: HttpClient, useClass: TestHttpClient }
      ]
    });
    component = TestBed.inject(ProfilePreviewComponent);
    httpClient = TestBed.inject(HttpClient);
  });

  it("Should load profile data via HTTP", () => {
    component.ngOnInit();
    expect(component.profileData).not.toBeNull();
    expect(component.profileData).toEqual(profileData);
    expect(component.error).toBeNull();
  });

});

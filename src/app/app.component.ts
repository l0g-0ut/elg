import {Component, OnInit} from '@angular/core';
import {ApiData} from "./model/api-data";
import {ProfileData} from "./services/profile.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public apiData: ApiData;
  public profileData: ProfileData | null = null;
  public currentStep = 1;

  public title: string = 'Welcome, stranger!';

  private step1Confirm() {
    if (this.apiData.apiKey != '' && this.apiData.apiUser != '') {
      this.currentStep = 2;
      this.title = 'Pick your Profile';
    }
  }

  private step2Confirm(profileData: ProfileData) {
    this.profileData = profileData;
    this.currentStep = 3;
    this.title = 'Let\'s see how lucky you are';
  }

  public onConfirm(confirm: boolean | ProfileData) {
    if (confirm === false) {
      return;
    }
    switch (this.currentStep) {
      case 1:
        this.step1Confirm();
        break;
      case 2:
        this.step2Confirm(confirm as ProfileData);
        break;
    }
  }

  ngOnInit(): void {
  }

  constructor() {
    this.apiData = new ApiData('', '')
  }

}

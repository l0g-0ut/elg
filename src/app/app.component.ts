import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiData} from "./model/api-data";
import {ProfileData} from "./services/profile.service";
import {faExclamationTriangle, faSyncAlt, faTimes} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute} from "@angular/router";
import {UserDefinedLink} from "./model/udl";
import {environment} from "../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  version = environment.version;

  isMenuCollapsed = true;

  faReload = faSyncAlt;
  faWarning = faExclamationTriangle;
  faClose = faTimes;

  public apiData: ApiData;
  public profileData: ProfileData | null = null;
  public currentStep = 1;

  public title: string = 'Welcome, stranger!';

  userDefinedProfile: UserDefinedLink | null = null;

  confirmedMaxOverride: boolean = false;
  confirmedMinOverride: boolean = false;

  maxTimeToConfirm: number = 0;
  minTimeToConfirm: number = 0;

  confirmationMaxText: string = 'I understand';
  confirmationMaxInput: string = '';

  confirmationMinText: string = 'Got it';
  confirmationMinInput: string = '';

  @ViewChild("overrideMaxWarning") overrideMaxWarning!: any;
  @ViewChild("overrideMinWarning") overrideMinWarning!: any;
  @ViewChild("profilePreviewer") profilePreviewer!: any;

  private step1Confirm() {
    if (this.apiData.apiKey != '' && this.apiData.apiUser != '') {
      this.currentStep = 2;
      this.title = 'Pick your Profile';
    }
  }

  private step2Confirm(profileData: ProfileData) {
    if (profileData?.overrideMaximumTime === true && !this.confirmedMaxOverride) {
      this.maxTimeToConfirm = 0;
      if (profileData.penalty.time.enabled) {
        let iterations;
        if (profileData.iterations.fix) {
          iterations = profileData.iterations.fix;
        }
        else {
          iterations = profileData.iterations.max;
        }
        this.maxTimeToConfirm = iterations * profileData.penalty.time.max;
      }
      this.confirmationMaxInput = '';
      this.modalService.open(this.overrideMaxWarning, {
        size: "xl",
        centered: true,
        scrollable: true,
      }).result.then((confirmed) => {
        this.confirmedMaxOverride = true;
        this.step2Confirm(profileData);
      }, (dismissed) => {
        this.confirmedMaxOverride = false;
      });
      return;
    }
    if (profileData?.penalty.minimumTime.enabled && !this.confirmedMinOverride) {
      this.minTimeToConfirm = profileData.penalty.minimumTime.max;
      let iterations;
      if (profileData.iterations.fix) {
        iterations = profileData.iterations.fix;
      }
      else {
        iterations = profileData.iterations.max;
      }
      this.minTimeToConfirm = iterations * profileData.penalty.minimumTime.max;
      this.confirmationMinInput = '';
      this.modalService.open(this.overrideMinWarning, {
        size: "xl",
        centered: true,
        scrollable: true,
      }).result.then((confirmed) => {
        this.confirmedMinOverride = true;
        this.step2Confirm(profileData);
      }, (dismissed) => {
        this.confirmedMinOverride = false;
      });
      return;
    }
    this.profileData = profileData;
    this.currentStep = 3;
    this.title = 'Let\'s see how lucky you are';
  }

  private launchLinkBuilder() {
    this.title = 'Profile Link Builder';
    this.currentStep = -1;
  }

  public onConfirm(confirm: boolean | ProfileData) {
    if (confirm === false) {
      this.launchLinkBuilder();
      return;
    }
    switch (this.currentStep) {
      case -2:
        this.step2Confirm(confirm as ProfileData);
        break;
      case 1:
        this.step1Confirm();
        break;
      case 2:
        this.step2Confirm(confirm as ProfileData);
        break;
    }
  }

  constructor(private route: ActivatedRoute, private modalService: NgbModal) {
    this.apiData = new ApiData('', '');
  }

  handlePredefinedProfile(rawProfileData: string) {
    const profileData = JSON.parse(atob(rawProfileData));
    this.userDefinedProfile = UserDefinedLink.factory(profileData);
    this.currentStep = -2;
    this.title = 'Lucky you!';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const predefinedProfile = params['p'];
      if (predefinedProfile) {
        this.handlePredefinedProfile(predefinedProfile);
      }
    });
  }

  openPreview(): void {
    this.modalService.open(this.profilePreviewer, {
      size: "xl",
      centered: true,
      scrollable: true,
    });
  }

}

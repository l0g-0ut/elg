import {Component} from "@angular/core";
import {UserDefinedLink} from "../../model/udl";
import {faCheckSquare, faExclamationTriangle, faExternalLinkAlt, faLink} from "@fortawesome/free-solid-svg-icons";
import {PlatformLocation} from "@angular/common";
import {UrlShortenerService} from "../../services/urlshortener.service";

@Component({
  selector: 'builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent {

  faBuild = faLink;
  faReady = faCheckSquare;
  faShorten = faExternalLinkAlt;
  faLimit = faExclamationTriangle;

  generatedLink: string | null = null;
  shortenedUrl: string | null = null;
  shortenerError: string | null = null;

  shortenerAvailable = true;

  formModelOptions = {
    standalone: true,
  };

  profileData = new UserDefinedLink();

  private formerFixedIterValue: number | null = null;
  private fixedIterState: boolean | null = null;

  errors = {
    name: <string | null> null,
    enableFixIterations: <string | null> null,
    fixIterations: <string | null> null,
    iterMin: <string | null> null,
    iterMax: <string | null> null,
    sleepMin: <string | null> null,
    sleepMax: <string | null> null,
    timeMin: <string | null> null,
    timeMax: <string | null> null,
    minTimeMin: <string | null> null,
    minTimeMax: <string | null> null,
    reqMin: <string | null> null,
    reqMax: <string | null> null,
  };

  validationFailed = false;

  changeFixedIter(event: any) {
    if (event?.target?.checked === true) {
      this.fixedIterState = true;
      if (this.formerFixedIterValue === null) {
        this.profileData.settings.iterations.fix = 1;
      }
      else {
        this.profileData.settings.iterations.fix = this.formerFixedIterValue;
      }
    }
    else {
      this.fixedIterState = false;
      this.formerFixedIterValue = this.profileData.settings.iterations.fix;
      this.profileData.settings.iterations.fix = null;
    }
  }

  validate() {
    this.generatedLink = null;
    let validated = true;
    if (this.profileData.profileName !== null) {
      this.profileData.profileName = this.profileData.profileName.trim();
    }
    if (this.profileData.profileName === null || this.profileData.profileName.length < 1) {
      validated = false;
      this.errors.name = 'You should provide a name for your profile.';
    }
    else {
      this.errors.name = null;
    }
    if (this.profileData.settingsShown === null) {
      this.profileData.settingsShown = false;
    }
    if (this.profileData.settings.iterations.fix !== null) {
      this.errors.iterMin = null;
      this.errors.iterMax = null;
      // Validate for fix, ignore random values
      if (!Number.isSafeInteger(this.profileData.settings.iterations.fix) || this.profileData.settings.iterations.fix < 1) {
        this.errors.fixIterations = 'Please enter a number, 1 or greater.';
        validated = false;
      }
      else {
        this.errors.fixIterations = null;
      }
    }
    else {
      if (this.fixedIterState) {
        this.errors.fixIterations = 'Please enter a number, 1 or greater.';
        validated = false;
      }
      else {
        this.errors.fixIterations = null;
        let minIterOkay = false;
        // validate for not fix
        if (!Number.isSafeInteger(this.profileData.settings.iterations.min) || this.profileData.settings.iterations.min < 1) {
          validated = false;
          this.errors.iterMin = 'Please enter a number, 1 or greater.';
        }
        else {
          this.errors.iterMin = null;
          minIterOkay = true;
        }
        if (!Number.isSafeInteger(this.profileData.settings.iterations.max) || this.profileData.settings.iterations.max < 1) {
          validated = false;
          this.errors.iterMax = 'Please enter a number, 1 or greater.';
        }
        else {
          this.errors.iterMax = null;
          if (minIterOkay && this.profileData.settings.iterations.max <= this.profileData.settings.iterations.min) {
            this.errors.iterMax = 'The max must be higher than the min.';
            validated = false;
          }
        }
      }
    }
    let minSleepsOkay = false;
    if (!Number.isSafeInteger(this.profileData.settings.sleeps.min) || this.profileData.settings.sleeps.min < 1) {
      this.errors.sleepMin = 'Please enter a number, 1 or greater.';
      validated = false;
    }
    else {
      this.errors.sleepMin = null;
      minSleepsOkay = true;
    }
    if (!Number.isSafeInteger(this.profileData.settings.sleeps.max) || this.profileData.settings.sleeps.max < 1) {
      this.errors.sleepMax = 'Please enter a number, 1 or greater.';
      validated = false;
    }
    else {
      this.errors.sleepMax = null;
      if (minSleepsOkay && this.profileData.settings.sleeps.max <= this.profileData.settings.sleeps.min) {
        this.errors.sleepMax = 'The max must be higher than the min.';
        validated = false;
      }
    }
    if (this.profileData.settings.penalty.time.enabled === null) {
      this.profileData.settings.penalty.time.enabled = false;
    }
    if (this.profileData.settings.penalty.time.enabled) {
      let minTimeOkay = false;
      // validate time
      if (!Number.isSafeInteger(this.profileData.settings.penalty.time.min) || this.profileData.settings.penalty.time.min < 1) {
        this.errors.timeMin = 'Please enter a valid time.';
        validated = false;
      }
      else {
        this.errors.timeMin = null;
        minTimeOkay = true;
      }
      if (!Number.isSafeInteger(this.profileData.settings.penalty.time.max) || this.profileData.settings.penalty.time.max < 1) {
        this.errors.timeMax = 'Please enter a valid time.';
        validated = false;
      }
      else {
        this.errors.timeMax = null;
        if (minTimeOkay && this.profileData.settings.penalty.time.max <= this.profileData.settings.penalty.time.min) {
          this.errors.timeMax = 'The max must be higher than the min.';
          validated = false;
        }
      }
    }
    else {
      // No time
      this.errors.timeMin = null;
      this.errors.timeMax = null;
    }
    if (this.profileData.settings.penalty.minimumTime.enabled) {
      let minTimeOkay = false;
      // validate time
      if (!Number.isSafeInteger(this.profileData.settings.penalty.minimumTime.min) || this.profileData.settings.penalty.minimumTime.min < 1) {
        this.errors.minTimeMin = 'Please enter a valid time.';
        validated = false;
      }
      else {
        this.errors.minTimeMin = null;
        minTimeOkay = true;
      }
      if (!Number.isSafeInteger(this.profileData.settings.penalty.minimumTime.max) || this.profileData.settings.penalty.minimumTime.max < 1) {
        this.errors.minTimeMax = 'Please enter a valid time.';
        validated = false;
      }
      else {
        this.errors.minTimeMax = null;
        if (minTimeOkay && this.profileData.settings.penalty.minimumTime.max <= this.profileData.settings.penalty.minimumTime.min) {
          this.errors.minTimeMax = 'The max must be higher than the min.';
          validated = false;
        }
      }
    }
    else {
      // No time
      this.errors.minTimeMin = null;
      this.errors.minTimeMax = null;
    }
    if (this.profileData.settings.penalty.requirements.enabled) {
      let minReqOkay = false;
      // validate reqs
      if (!Number.isSafeInteger(this.profileData.settings.penalty.requirements.min) || this.profileData.settings.penalty.requirements.min < 1) {
        this.errors.reqMin = 'Please enter a number, 1 or greater.';
        validated = false;
      }
      else {
        this.errors.reqMin = null;
        minReqOkay = true;
      }
      if (!Number.isSafeInteger(this.profileData.settings.penalty.requirements.max) || this.profileData.settings.penalty.requirements.max < 1) {
        this.errors.reqMax = 'Please enter a number, 1 or greater.';
        validated = false;
      }
      else {
        this.errors.reqMax = null;
        if (minReqOkay && this.profileData.settings.penalty.requirements.max <= this.profileData.settings.penalty.requirements.min) {
          this.errors.reqMax = 'The max must be higher than the min.';
          validated = false;
        }
      }
    }
    else {
      // No requirements
      this.errors.reqMin = null;
      this.errors.reqMax = null;
    }
    return validated;
  }

  buildLink() {
    this.shortenedUrl = null;
    this.generatedLink = null;
    this.shortenerAvailable = true;
    if (!this.validate()) {
      this.validationFailed = true;
      return;
    }
    this.validationFailed = false;
    const linkData = btoa(JSON.stringify(this.profileData));
    let link = this.platformLocation.protocol;
    if (!link.endsWith(':')) {
      link += ':';
    }
    link += '//' + this.platformLocation.hostname;
    if (this.platformLocation.port) {
      link += ':' + this.platformLocation.port;
    }
    link += this.platformLocation.getBaseHrefFromDOM();
    if (!link.endsWith('/')) {
      link += '/';
    }
    link += '?p=' + linkData;
    this.generatedLink = link;
  }

  shortenUrl() {
    this.shortenerAvailable = false;
    if (this.generatedLink === null) {
      return;
    }
    this.shortenedUrl = null;
    this.shortenerError = null;
    this.urlShortener.buildShortUrl(this.generatedLink).subscribe((result) => {
      if (result.error_code) {
        this.shortenerError = 'An error happened while shortening your link; error code: ' + result.error_code;
        this.shortenerAvailable = true;
      }
      else if (!result.ok) {
        this.shortenerError = 'An error happened while shortening your link.';
        this.shortenerAvailable = true;
      }
      else if (result.result?.full_short_link) {
        this.shortenedUrl = result.result?.full_short_link;
      }
      else {
        this.shortenerError = 'An unknown error occurred while trying to shorten your link.';
        this.shortenerAvailable = true;
      }
    }, (error) => {
      this.shortenerError = 'Unable to create a shortened URL at the moment, sorry :-(';
      this.shortenerAvailable = true;
    });
  }

  constructor(private platformLocation: PlatformLocation, private urlShortener: UrlShortenerService) {}

}

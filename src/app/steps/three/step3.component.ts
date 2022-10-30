import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {ApiData} from "../../model/api-data";
import {ProfileData} from "../../services/profile.service";
import {EmlalockService} from "../../services/emlalock.service";

export interface Iteration {
  addingTime: number;
  addingMinTime: number;
  addingReq: number;
  sleepSecs: number;
  iteration: number;
}

@Component({
  selector: 'step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit, AfterViewInit {

  @Input() public apiData!: ApiData;
  @Input() public profileData!: ProfileData | null;

  iterations: Iteration[] = [];
  currentIteration: Iteration | null = null;
  index = -1;

  error = false;

  private static getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private addRequirementsAndMinimumTime(requirements: number, minSeconds: number): void {
    if (requirements > 0) {
      this.emlalockService.addRequirements(requirements, this.apiData).subscribe((value) => {
        this.addMinimumTime(minSeconds);
      }, (error) => {
        // don't worry
      });
    }
    else {
      this.addMinimumTime(minSeconds);
    }
  }

  private addTimeAndRequirements(seconds: number, requirements: number, minSeconds: number): void {
    if (seconds > 0) {
      this.emlalockService.addTime(seconds, this.apiData, "Compliments from l0g-0ut.github.io/elg").subscribe((value) => {
        this.addRequirementsAndMinimumTime(requirements, minSeconds);
      }, (error) => {
        this.error = true;
      });
    }
    else {
      this.addRequirementsAndMinimumTime(requirements, minSeconds);
    }
  }

  private addMinimumTime(seconds: number): void {
    if (seconds > 0) {
      this.emlalockService.addMinimumTime(seconds, this.apiData).subscribe((value) => {}, (error) => {});
    }
  }

  ngOnInit(): void {
    if (this.profileData === null) {
      return;
    }
    const numOfIterations = this.profileData.iterations.fix !== null ? this.profileData.iterations.fix : Step3Component.getRandomInt(this.profileData.iterations.min, this.profileData.iterations.max);
    let seconds = 0;
    let minSeconds = 0;
    let requirements = 0;
    let iteration = 0;
    for (let i = 1; i <= numOfIterations; i++) {
      iteration++;
      let addSeconds = 0;
      if (this.profileData.penalty.time.enabled) {
        addSeconds = Step3Component.getRandomInt(this.profileData.penalty.time.min, this.profileData.penalty.time.max);
      }
      seconds += addSeconds;
      let addMinSeconds = 0;
      if (this.profileData.penalty.minimumTime.enabled) {
        addMinSeconds = Step3Component.getRandomInt(this.profileData.penalty.minimumTime.min, this.profileData.penalty.time.max);
      }
      minSeconds += addMinSeconds;
      let addRequirements = 0;
      if (this.profileData.penalty.requirements.enabled) {
        addRequirements = Step3Component.getRandomInt(this.profileData.penalty.requirements.min, this.profileData.penalty.requirements.max);
      }
      requirements += addRequirements;
      this.iterations.push({
        sleepSecs: Step3Component.getRandomInt(this.profileData.sleeps.min, this.profileData.sleeps.max),
        addingTime: addSeconds,
        addingMinTime: addMinSeconds,
        addingReq: addRequirements,
        iteration: iteration,
      });
    }
    if ((this.profileData.overrideMaximumTime === true) && (seconds > 0)) {
      this.emlalockService.addMaximumTime(seconds, this.apiData).subscribe(() => {
        setTimeout(() => {
          this.addTimeAndRequirements(seconds, requirements, minSeconds);
        }, 1000);
      }, (error) => {
        if (error.status === 400) {  // Workaround for Issue #4
          // User might have disabled "Maximum Time" - just send the time-and-requirements request
          this.addTimeAndRequirements(seconds, requirements, minSeconds);
        }
        else {
          // Any other error, even client side ones.
          this.error = true;
        }
      });
    }
    else {
      this.addTimeAndRequirements(seconds, requirements, minSeconds);
    }
  }

  nextSlide() {
    this.index++;
    if (this.index < this.iterations.length) {
      setTimeout(() => {
        this.currentIteration = this.iterations[this.index];
        this.nextSlide();
      }, this.iterations[this.index].sleepSecs * 1000);
    }
  }

  ngAfterViewInit(): void {
    this.nextSlide()
  }

  constructor(private emlalockService: EmlalockService) {}

}

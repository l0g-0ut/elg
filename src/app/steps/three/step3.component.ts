import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {ApiData} from "../../model/api-data";
import {ProfileData} from "../../services/profile.service";
import {EmlalockService} from "../../services/emlalock.service";

export interface Iteration {
  addingTime: number;
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

  ngOnInit(): void {
    if (this.profileData === null) {
      return;
    }
    const numOfIterations = this.profileData.iterations.fix !== null ? this.profileData.iterations.fix : Step3Component.getRandomInt(this.profileData.iterations.min, this.profileData.iterations.max);
    let seconds = 0;
    let requirements = 0;
    let iteration = 0;
    for (let i = 1; i <= numOfIterations; i++) {
      iteration++;
      let addSeconds = 0
      if (this.profileData.penalty.time.enabled) {
        addSeconds = Step3Component.getRandomInt(this.profileData.penalty.time.min, this.profileData.penalty.time.max);
      }
      seconds += addSeconds;
      let addRequirements = 0
      if (this.profileData.penalty.requirements.enabled) {
        addRequirements = Step3Component.getRandomInt(this.profileData.penalty.requirements.min, this.profileData.penalty.requirements.max);
      }
      requirements += addRequirements;
      this.iterations.push({
        sleepSecs: Step3Component.getRandomInt(this.profileData.sleeps.min, this.profileData.sleeps.max),
        addingTime: addSeconds,
        addingReq: addRequirements,
        iteration: iteration,
      });
    }
    this.emlalockService.addTime(seconds, this.apiData).subscribe((value) => {
      this.emlalockService.addRequirements(requirements, this.apiData).subscribe((value) => {
        // fine!
      }, (error) => {
        this.error = true;
      });
    }, (error) => {
      this.error = true;
    });
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

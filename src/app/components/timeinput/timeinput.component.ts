import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = 7 * DAY;

@Component({
  selector: 'time',
  templateUrl: './timeinput.component.html',
  styleUrls: ['./timeinput.component.css']
})
export class TimeinputComponent implements OnChanges {

  @Input() label!: string;

  @Input()  model!: number;
  @Output() modelChange = new EventEmitter<number>();

  @Input() fieldError!: string | null;
  @Input() enabled!: boolean;

  formModelOptions = {
    standalone: true,
  };

  weeks = 0;
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  valueChanged() {
    let newValue = this.seconds;
    newValue += this.minutes * 60;
    newValue += this.hours * 60 * 60;
    newValue += this.days * 24 * 60 * 60;
    newValue += this.weeks * 7 * 24 * 60 * 60;
    this.modelChange.emit(newValue);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let rest = this.model;
    this.weeks = Math.floor(rest / WEEK);
    rest = rest - this.weeks * WEEK;
    this.days = Math.floor(rest / DAY);
    rest = rest - this.days * DAY;
    this.hours = Math.floor(rest / HOUR);
    rest = rest - this.hours * HOUR;
    this.minutes = Math.floor(rest/ MINUTE);
    rest = rest - this.minutes * MINUTE;
    this.seconds = rest;
  }

}

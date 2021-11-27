import { Pipe, PipeTransform } from '@angular/core';


const MIN = 60;
const HOUR = (60 * MIN);
const DAY = (24 * HOUR);
const WEEK = (7 * DAY);


@Pipe({name: 'secTransform'})
export class SecTransformPipe implements PipeTransform {
  transform(value: number): string {
    let rest = value;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let weeks = Math.floor(rest / WEEK);
    rest = rest - (weeks * WEEK);
    if (rest > 0) {
      days = Math.floor(rest / DAY);
      rest = rest - (days * DAY);
    }
    if (rest > 0) {
      hours = Math.floor(rest / HOUR);
      rest = rest - (hours * HOUR);
    }
    if (rest > 0) {
      minutes = Math.floor(rest / MIN);
      rest = rest - (minutes * MIN);
    }
    if (rest > 0) {
      seconds = rest;
    }
    let retData = [];
    if (weeks > 0) {
      retData.push(weeks + ' ' + (weeks == 1 ? 'Week': 'Weeks'));
    }
    if (days > 0) {
      retData.push(days + ' ' + (days == 1 ? 'Day': 'Days'));
    }
    if (hours > 0) {
      retData.push(hours + ' ' + (hours == 1 ? 'Hour': 'Hours'));
    }
    if (minutes > 0) {
      retData.push(minutes + ' ' + (minutes == 1 ? 'Minute': 'Minutes'));
    }
    if (seconds > 0) {
      retData.push(seconds + ' ' + (seconds == 1 ? 'Second': 'Seconds'));
    }
    return retData.join(' ');
  }
}

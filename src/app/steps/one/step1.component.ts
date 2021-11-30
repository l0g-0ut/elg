import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ApiData} from "../../model/api-data";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component {

  faInfo = faInfoCircle

  @Input() public apiData!: ApiData;
  @Output() callback = new EventEmitter<boolean>();

}

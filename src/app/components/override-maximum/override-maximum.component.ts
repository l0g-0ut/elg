import {Component, Input} from "@angular/core";
import {faCheckSquare, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'override-maximum',
  templateUrl: './override-maximum.component.html',
  styleUrls: ['./override-maximum.component.css']
})
export class OverrideMaximumComponent {

  faRespect = faCheckSquare;
  faDisrespect = faExclamationTriangle;

  @Input() value?: boolean;
  @Input() showWhenRespecting?: boolean;

}

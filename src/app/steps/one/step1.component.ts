import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ApiData} from "../../model/api-data";
import {faInfoCircle, faMagnifyingGlass, faSquarePlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component {

  userPattern = '^[a-z0-9]{14,20}$'
  keyPattern = '^[a-z0-9]{10,16}$'

  faInfo = faInfoCircle;
  faCreate = faSquarePlus;
  faPreview = faMagnifyingGlass

  @Input() public apiData!: ApiData;
  @Output() callback = new EventEmitter<boolean>();
  @Output() previewOpener = new EventEmitter<boolean>();

  apiUserValidated: boolean | null = null;
  apiKeyValidated: boolean | null = null;

  validateUser() {
    this.apiUserValidated = this.apiData.apiUser.match(this.userPattern) !== null;
  }

  validateKey() {
    this.apiKeyValidated = this.apiData.apiKey.match(this.keyPattern) !== null;
  }

  validate() {
    this.validateUser();
    this.validateKey();
    return (this.apiUserValidated && this.apiKeyValidated);
  }

  submit() {
    if (this.validate()) {
      this.callback.emit(true);
    }
  }

}

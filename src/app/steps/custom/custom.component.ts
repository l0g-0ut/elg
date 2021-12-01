import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ProfileData} from "../../services/profile.service";
import {UserDefinedLink} from "../../model/udl";
import {ApiData} from "../../model/api-data";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css']
})
export class CustomComponent {

  userPattern = '^[a-z0-9]{14,20}$'
  keyPattern = '^[a-z0-9]{10,16}$'

  faInfo = faInfoCircle;

  @Output() callback = new EventEmitter<ProfileData>();
  @Input() userDefinedLink!: UserDefinedLink;
  @Input() public apiData!: ApiData;

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
      this.callback.emit(this.userDefinedLink.settings);
    }
  }

}

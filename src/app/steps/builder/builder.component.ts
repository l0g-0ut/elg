import {Component} from "@angular/core";
import {UserDefinedLink} from "../../model/udl";
import {faLink} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent {

  faBuild = faLink

  formModelOptions = {
    standalone: true,
  };

  profileData = new UserDefinedLink();

  private formerFixedIterValue: number | null = null;

  changeFixedIter(event: any) {
    if (event?.target?.checked === true) {
      if (this.formerFixedIterValue === null) {
        this.profileData.settings.iterations.fix = 1;
      }
      else {
        this.profileData.settings.iterations.fix = this.formerFixedIterValue;
      }
    }
    else {
      this.formerFixedIterValue = this.profileData.settings.iterations.fix;
      this.profileData.settings.iterations.fix = null;
    }
  }

  buildLink() {
    console.log(this.profileData);
  }

}

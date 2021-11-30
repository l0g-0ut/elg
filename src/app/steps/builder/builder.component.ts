import {Component} from "@angular/core";
import {UserDefinedLink} from "../../model/udl";

@Component({
  selector: 'builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent {

  profileData = new UserDefinedLink();

}

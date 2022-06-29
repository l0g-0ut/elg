import {Component, OnInit} from "@angular/core";
import {ProfileResponse, ProfileService} from "../../services/profile.service";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.css']
})
export class ProfilePreviewComponent implements OnInit {

  public profileData: ProfileResponse | null = null;
  public profileDataKeys: string[] | null = null;
  public error: string | null = null;

  faLoading = faSpinner;

  ngOnInit(): void {
    this.profileData = null;
    this.error = null;
    this.profileService.getProfiles().subscribe((result) => {
      this.profileData = result;
      this.profileDataKeys = Object.keys(this.profileData);
    }, (error) => {
      this.profileData = null;
      this.error = error;
    });
  }

  constructor(private profileService: ProfileService) {
  }

}

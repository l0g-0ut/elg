import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {ProfileData, ProfileResponse, ProfileService} from "../../services/profile.service";

@Component({
  selector: 'step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

  @Output() callback = new EventEmitter<ProfileData>();

  public profileData: ProfileResponse | null = null;
  public profileDataKeys: string[] | null = null;
  public error: string | null = null;

  selectProfile(profile: ProfileData) {
    this.callback.emit(profile);
  }

  ngOnInit(): void {
    this.profileService.getProfiles().subscribe((data) => {
      this.profileData = data;
      this.profileDataKeys = Object.keys(this.profileData);
    }, (error) => {
      this.error = error;
    });
  }

  constructor(private profileService: ProfileService) {}

}

import {ProfileData} from "../services/profile.service";

export class UserDefinedLink {

  constructor(
    public settingsShown: boolean = true,
    public profileName: string = '',
    public settings: ProfileData = {
      iterations: {
        fix: null,
        min: 1,
        max: 10,
      },
      penalty: {
        time: {
          enabled: true,
          min: 60,
          max: 3600,
        },
        minimumTime: {
          enabled: false,
          min: 1,
          max: 3600,
        },
        requirements: {
          enabled: true,
          min: 1,
          max: 5,
        }
      },
      sleeps: {
        min: 10,
        max: 60,
      },
      inFeelingLucy: false,
      overrideMaximumTime: false,
    }
  ) {}

}

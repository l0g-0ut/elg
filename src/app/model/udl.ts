import {ProfileData} from "../services/profile.service";
import * as _ from 'lodash';


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
      inFeelingLucky: false,
      overrideMaximumTime: false,
    }
  ) {}

  public static factory(pro: Partial<UserDefinedLink>): UserDefinedLink {
    const obj = _.merge(new UserDefinedLink(), pro);
    return <UserDefinedLink>obj;
  }

}

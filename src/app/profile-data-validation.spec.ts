import {ProfileResponse} from "./services/profile.service";

declare function require(moduleName: string): any;

describe('Profile Data Validation', () => {

  let profileData!: ProfileResponse;

  beforeAll(() => {
    profileData = require( '../assets/profiles.json') as ProfileResponse;
  });

  it('was readable', () => {
    expect(profileData).not.toBeNull();
    expect(profileData).toBeTruthy();
  });

  it('should contain at least 5 profiles', () => {
    expect(Object.keys(profileData).length).toBeGreaterThanOrEqual(5);
  });

});

import { SAUCE_DEMO_USER_PASSWORD } from '../constants/app';

export class UserTestData {
  static get ACTIVE_USER() {
    return {
      username: 'standard_user',
      password: SAUCE_DEMO_USER_PASSWORD
    };
  }

  static get LOCKED_USER() {
    return {
      username: 'locked_out_user',
      password: SAUCE_DEMO_USER_PASSWORD
    };
  }
}

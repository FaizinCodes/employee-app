import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";


export class ValidatorLoginCustom {

  userList: string[] = [];

  constructor() {
    this.userList = ['admin@email.com', 'superuser@email.com']
  }

  static MatchPassword(userName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log(userName);

      if (!userName) {
        return { usernameEmpty: true }
      } else if (userName == 'admin@email.com') {
        return (control.value == 'admin123')
          ? null
          : { wrongPassword: true }

      } else {
        return { wrongUserName: true }
      }
    }
  }

  static userNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const userList = ['admin@email.com', 'superuser@email.com'];
      return (userList.includes(control.value)) ? null : { usernameNotFound: true }
    }
  }
}

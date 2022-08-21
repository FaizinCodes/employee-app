import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";


export class ValidatorAddEmployer {

  static birthDayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      let
        dateSelected = new Date(control.value),
        dateNow = new Date();

      return (dateSelected >= dateNow) ? { dateNotValid: true } : null;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorLoginCustom } from '../helper/validator-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formLogin = this.fb.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.email,
        ValidatorLoginCustom.userNameValidator()
      ])],
      password: [null, Validators.compose([
        Validators.required
      ])]
    })
  }

  onSubmit(data: any) {

    // Make sure All Input valid
    Object.keys(this.formLogin.controls).forEach(field => {
      const control = this.formLogin.get(field);
      control?.markAsTouched({ onlySelf: true });
    });

    console.log(data);
    if (this.formLogin.valid) {
      console.log('Form Valid');
    } else {
      console.log('Form Tidak Valid');
    }
  }

}

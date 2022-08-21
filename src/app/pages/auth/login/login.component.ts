import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ValidatorLoginCustom } from '../helper/validator-login';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  formLogin!: FormGroup;

  subscribs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscribs.forEach(sub => sub.unsubscribe());
  }

  initForm() {
    this.formLogin = this.fb.group({
      username: [null, Validators.compose([
        Validators.required,
        Validators.email,
        ValidatorLoginCustom.userNameValidator()
      ])],
      password: [null, Validators.compose([
        Validators.required
      ])]
    })
  }

  get emailValue() {
    return this.formLogin.get('username')?.value
  }

  onSubmit(data: any) {
    // Make sure All Input valid
    for (let field of Object.keys(this.formLogin.controls)) {
      const control = this.formLogin.get(field);
      control?.markAsTouched({ onlySelf: true });
    }

    if (this.formLogin.valid) {
      console.log('Form Valid');

      let data = this.formLogin.value;

      const sub = this.service.login(data).subscribe(value => {
        this.router.navigate(['/employee']);
      },
        error => {
          this.formLogin.get('password')?.setErrors({ wrongPassword: true })
        });

      this.subscribs.push(sub);
    } else {
      console.log('Form Tidak Valid');
    }
  }

}

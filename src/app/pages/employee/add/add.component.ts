import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeFormInitialControl } from '../const/employee-add.const';
import { ValidatorAddEmployer } from '../helper/add-employee-validator';
import { formData } from '../model/employee.model';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {

  tittle = 'Add New Data Employer';

  formAddNewEmployer!: FormGroup;
  dataForm: formData[] = [];

  subscribs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.dataForm = EmployeeFormInitialControl;
  }

  ngOnDestroy(): void {
    this.subscribs.forEach(sub => sub.unsubscribe());
  }

  initForm() {
    this.formAddNewEmployer = this.fb.group(
      {
        basicSalary: [null, Validators.compose([
          Validators.required
        ])],
        birthDate: [null, Validators.compose([
          Validators.required,
          ValidatorAddEmployer.birthDayValidator()
        ])],
        description: [null, Validators.compose([
          Validators.required
        ])],
        email: [null, Validators.compose([
          Validators.required,
          Validators.email
        ])],
        firstName: [null, Validators.compose([
          Validators.required
        ])],
        group: [null, Validators.compose([
          Validators.required
        ])],
        lastName: [null, Validators.compose([
          Validators.required
        ])],
        status: [null, Validators.compose([
          Validators.required
        ])],
        username: [null, Validators.compose([
          Validators.required
        ])]
      }
    );
  }

  onSubmit(event: any) {
    for (let field of Object.keys(this.formAddNewEmployer.controls)) {
      const control = this.formAddNewEmployer.get(field);
      control?.markAsTouched({ onlySelf: true });
    }

    if (this.formAddNewEmployer.valid) {
      console.log(this.formAddNewEmployer.value);
      const sub = this.service.addEmployer(this.formAddNewEmployer.value).subscribe(res => {
        console.log(res);
        this.router.navigate(['/employee']);
      });

      this.subscribs.push(sub);
    }
  }

  back() {
    this.location.back();
  }

}

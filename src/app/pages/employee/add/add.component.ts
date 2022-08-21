import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidatorAddEmployer } from '../helper/add-employee-validator';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {

  tittle = 'Add New Data Employer';

  formAddNewEmployer!: FormGroup;
  public searchGroup: FormControl = new FormControl();

  listGroup: string[] = ['IT', 'Finance', 'HRD', 'Management', 'EO', 'Documentation', 'Marketing', 'Security', 'OB', 'Legal'];
  listShow: string[] = [];

  listStatus: string[] = ['singel', 'meried'];

  // searchTimeoutSetting
  typingTimer: any;
  doneTypingInterval = 1500;

  subscribs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.listShow = this.listGroup;
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

    this.searchGroup.valueChanges.subscribe(value => {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.filterGroup(value);
      }, this.doneTypingInterval);
    })
  }

  filterGroup(value: string) {
    if (value) {
      this.listShow = this.listGroup.filter(data => { return data.toLowerCase().includes(value.toLowerCase()) })
    } else {
      this.listShow = this.listGroup;
    }
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
      });

      this.subscribs.push(sub);
    }
  }

  back() {
    this.location.back();
  }

}

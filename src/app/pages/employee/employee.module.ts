import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ListComponent } from './list/list.component';
import { EmployeeComponent } from './employee.component';
import { ComponentModule } from '../component/component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [
    ListComponent,
    EmployeeComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ComponentModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmpaddproductComponent } from './empaddproduct/empaddproduct.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmpaddproductComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }

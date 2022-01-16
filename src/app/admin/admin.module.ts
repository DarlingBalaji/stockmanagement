import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddproductComponent } from '../admin/addproduct/addproduct.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BillingComponent } from './billing/billing.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { ListcontactComponent } from './listcontact/listcontact.component';


@NgModule({
  declarations: [
    AddproductComponent,
    BillingComponent,
    AddcontactComponent,
    ListcontactComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddproductComponent
  ]
})
export class AdminModule { }

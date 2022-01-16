import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddproductComponent } from '../admin/addproduct/addproduct.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { BillingComponent } from './billing/billing.component';
import { ListcontactComponent } from './listcontact/listcontact.component';


const routes: Routes = [
  { path: 'add-product', component: AddproductComponent },
  { path: 'edit-product', component: AddproductComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'add-contact', component: AddcontactComponent },
  { path: 'edit-contact', component: AddcontactComponent },
  { path: 'list-contact', component: ListcontactComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpaddproductComponent } from './empaddproduct/empaddproduct.component';


const routes: Routes = [
  { path: 'add-product', component: EmpaddproductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

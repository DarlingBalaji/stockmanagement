import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdfComponent } from './pdf/pdf.component';
import { ViewproductComponent } from './shared/viewproduct/viewproduct.component';


const routes: Routes = [
  
  // auth routes
  {
    path: '',
    loadChildren: () => import('./authentication/authentication.module').then( e => e.AuthenticationModule )
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then( e => e.AuthenticationModule )
  },

  // admin routes
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( e => e.AdminModule )
  },

  {
    path: 'view-products',
    component: ViewproductComponent
  },

  // employee routes
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then( e => e.EmployeeModule )
  },

  {
    path: 'pdf',
    component: PdfComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

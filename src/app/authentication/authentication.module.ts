import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthenticationModule { }

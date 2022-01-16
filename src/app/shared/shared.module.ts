import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatTableModule, MatRadioModule, MatSelectModule, MatAutocompleteModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';


// Other Imports
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ViewproductComponent],

  imports: [
    CommonModule,
    SharedRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],

  exports: [
    HeaderComponent,
    FooterComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    NgxSpinnerModule,
    ToastrModule
  ]
})
export class SharedModule { }



import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './service/commonSerivce/common.service';
import { NotificationService } from './service/notificationService/notification.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PdfComponent } from './pdf/pdf.component';


@NgModule({
  declarations: [
    AppComponent,
    PdfComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ],
  providers: [
    CommonService,
    NotificationService
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }

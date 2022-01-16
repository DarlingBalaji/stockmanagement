import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public spinnerLoadingText: String = "";
  public loadingBarCount = 0;
  public preventLoading: Boolean = false;
  
  constructor( public spinner: NgxSpinnerService ) { }

  public showSpinner(){
    this.spinnerLoadingText = "Loading...";
    this.loadingBarCount = this.loadingBarCount + 1;
    this.spinner.show();
    this.preventLoading = true;
    console.log('Spinner show', this.loadingBarCount);
  }

  public hideSpinner(){
    if ( this.loadingBarCount != 0 ){
      this.loadingBarCount = this.loadingBarCount - 1;
    }

    if ( this.loadingBarCount <= 0 ){
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      this.preventLoading = false;
    }
    console.log('Spinner hide', this.loadingBarCount);
  }

}

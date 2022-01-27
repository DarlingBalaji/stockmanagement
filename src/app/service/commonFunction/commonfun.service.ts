import { Injectable } from '@angular/core';
import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonfunService {

  constructor( private route: Router ) { }

  regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value)
        return null;
    
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  logout(){
    console.log(window.location.href);
    let URL = window.location.href;
    let urlpath = URL.split('#')[1];
    console.log('urlpath', urlpath);
    console.log('indexOf', urlpath.indexOf('/login'));

    if ( urlpath.indexOf('/login') == -1 ){
      console.log('indexOf', urlpath.indexOf('/login'), urlpath);
      this.route.navigate(['/auth/login'], { queryParams: {url: urlpath } })
    }
  }

}

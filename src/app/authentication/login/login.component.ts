import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonfunService } from 'src/app/service/commonFunction/commonfun.service';
import { CommonService } from 'src/app/service/commonSerivce/common.service';
import { apiService } from 'src/app/service/constants/apiurls.constants';
import { regexPattern } from 'src/app/service/constants/regex.constants';
import { NotificationService } from 'src/app/service/notificationService/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('emailID', {static: true}) emailID: ElementRef;
  @ViewChild('pws', {static: true}) pws: ElementRef;

  public eye: any = {};
  public param1: any = {};
  
  loginDetailsForm: FormGroup;

  constructor( private _route: ActivatedRoute, private service: CommonService, private commonFun: CommonfunService, private toastr: NotificationService, private route: Router) { 
    this._route.queryParams.subscribe(params => {
      this.param1 = params['url'];
    });
  }

  ngOnInit() {
    localStorage.clear();
    this.createForms();
    this.service.profileDetails();
  }

  ngAfterViewInit(): void {
      this.emailID.nativeElement.focus();
  }

  createForms() {
    this.loginDetailsForm = new FormGroup({
      email: new FormControl('', [ 
        Validators.required, 
        this.commonFun.regexValidator(new RegExp(regexPattern.EMAIL_PATTERN), {email: true})
      ]),
      password: new FormControl('', [ 
        Validators.required, 
        Validators.minLength(8)
      ])
    })
  }

  get loginFormControls() { return this.loginDetailsForm.controls }

  toggleEye(): void{
    this.eye = !this.eye;
  }

  onSubmit() {

    const data = {
      email: this.loginFormControls.email.value,
      password: this.loginFormControls.password.value
    };

    this.service.postfunction(apiService.LOGIN_API, data).subscribe( res => {
      console.log('login res', res);
      if ( res.status === 0 ){ // SUCCESS 
        this.toastr.snackBar(res.message, this.service.SUCCESS_TOAST);
        if ( this.param1 ) {
          console.log('url', this.param1)
          this.route.navigateByUrl(this.param1);
        } else {
          this.route.navigateByUrl('/view-products');
        }
      } else if ( res.status === -110 ){ // FOR PASSWORD MISMATCH
        this.loginDetailsForm.controls['password'].setValue('');
        this.pws.nativeElement.focus();
        this.toastr.snackBar(res.message, this.service.WARNING_TOAST);
      } else {
        this.emailID.nativeElement.focus();
        this.toastr.snackBar(res.message, this.service.ERROR_TOAST);
      }
    }, err => {
      console.error('Error', err.message);
      this.toastr.snackBar(err.statusText, this.service.ERROR_TOAST);
    });
  }

  lowerCase(formName, fieldName){
    let self = this;
    self[formName].controls[fieldName].setValue(self[formName].get(fieldName).value.toLowerCase());
  }
}

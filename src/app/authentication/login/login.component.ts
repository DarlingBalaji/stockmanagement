import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/commonSerivce/common.service';
import { apiService } from 'src/app/service/constants/apiurls.constants';
import { LocalstorageService } from 'src/app/service/localStorage/localstorage.service';
import { NotificationService } from 'src/app/service/notificationService/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  eye: any = {};

  loginDetailsForm: FormGroup;

  login_validation_message = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],

    password: [
      { type: 'required', message: 'Password is requried' },
    ]
  }

  constructor( private fb: FormBuilder, private service: CommonService, private toastr: NotificationService, private route: Router,
               private localStorageService: LocalstorageService, private _cd: ChangeDetectorRef) { }

  ngOnInit() {
    localStorage.clear();
    this.createForms();
    this.service.profileDetails();
  }

  createForms() {
    this.loginDetailsForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9+_.-@]+[a-zA-Z.-]+[a-zA-Z]$')
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    })
  }

  toggleEye(): void{
    this.eye = !this.eye;
  }

  onSubmit(value) {
    console.log('Form values', value.email);
    const data = {
      email: value.email,
      password: value.password
    };
    this.service.postfunction(apiService.LOGIN_API, data).subscribe( res => {
      console.log('login res', res);
      if ( res.status === 0 ){ // SUCCESS 
        this.toastr.snackBar(res.message, this.service.SUCCESS_TOAST);
        this._cd.markForCheck();
        this.route.navigateByUrl('/view-products');
      } else if ( res.status === -110 ){ // FOR PASSWORD MISMATCH
        this.toastr.snackBar(res.message, this.service.WARNING_TOAST);
      } else {
        this.toastr.snackBar(res.message, this.service.ERROR_TOAST);
      }
    });
  }
}

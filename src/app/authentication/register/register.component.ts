import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/commonSerivce/common.service';
import { apiService } from 'src/app/service/constants/apiurls.constants';
import { NotificationService } from 'src/app/service/notificationService/notification.service';
import { PasswordValidator, ParentErrorStateMatcher } from '../../validator/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  eye: any = {};
  eye_re: any = {};
  registerDetailsForm: FormGroup;
  matching_passwords_group: FormGroup;

   seasons: string[] = [
     'Admin',
     'Employee'
    ];

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  register_validation_message = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only letters' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ]
  }

  constructor( private fb: FormBuilder, private service: CommonService, private toastr: NotificationService, private route: Router ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.registerDetailsForm = this.fb.group({
      username: new FormControl('', Validators.compose([
       Validators.maxLength(25),
       Validators.minLength(5),
       Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
       Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      userstatus: new FormControl('', Validators.compose([
        Validators.required
      ])),
      matching_passwords: this.matching_passwords_group,
    })

    

  }

  toggleEye(): void{
    this.eye = !this.eye;
  }

  toggleEye_Re(): void{
    this.eye_re = !this.eye_re;
  }


  onSubmit(value) {
    console.log('Register value', value, value.matching_passwords.password);
    const data = {
      name: value.username,
      email: value.email,
      password: value.matching_passwords.password,
      userstatus: value.userstatus
    };
    console.log('register api', apiService.register);
    this.service.postfunction(apiService.register, data).subscribe( res => {
      console.log('login res', res);
      if ( res.status === 201 ){
        this.toastr.snackBar(res.message, this.service.SUCCESS_TOAST);
        this.route.navigateByUrl('/login');
      } else {
        this.toastr.snackBar(res.message, this.service.ERROR_TOAST);
      }
    });

  }

}

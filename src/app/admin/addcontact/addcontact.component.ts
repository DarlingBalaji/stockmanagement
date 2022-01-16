import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/service/commonSerivce/common.service';
import { apiService } from 'src/app/service/constants/apiurls.constants';
import { NotificationService } from 'src/app/service/notificationService/notification.service';
import { SpinnerService } from 'src/app/service/spinnerService/spinner-service.service';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.scss']
})

export class AddcontactComponent implements OnInit {
  userDetailsForm: FormGroup;
  country: any = [];
  state: any = [];
  city: any = [];
  userId: any = {};

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
    'address': [
      { type: 'required', message: 'Address is required' },
      { type: 'maxlength', message: 'Address cannot be more than 100 characters long' },
    ],
  }

  constructor( private fb: FormBuilder, private service: CommonService, private toastr: NotificationService, private route: Router, private _route: ActivatedRoute, private spinner: SpinnerService ) { 
    // this.countryList();
    this._route.queryParams.subscribe( e => {
      this.userId = e["user"];
    });
  }

  async ngOnInit() {
    this.createForm();
    await this.countryList();
  }

  async editContactList(){
    await  this.service.getfunction(apiService.VIEW_CONTACT + '/:' + atob(this.userId)).subscribe( res => {
      console.log('name', res["data"]["name"]);
      if ( res.status === 0 ){
        this.userDetailsForm.setValue({
          username: res["data"]["name"],
          email: res["data"]["email"],
          address: res["data"]["address"],
          pincode: res["data"]["pincode"],
          country: res["data"]["country"],
          state: res["data"]["state"],
          city: res["data"]["city"],
        })
      }
      this.selectState(res["data"]["country"]);
      this.selectCity(res["data"]["state"]);
      this.spinner.hideSpinner();
    });
  }

  async countryList(){
    await this.service.loadCountryList().subscribe( res => {
      this.country = res;
      console.log('this.country', this.country);
      
      // FOR EDIT CONTACT LIST
      if ( this.userId ){
        console.log('userId');
        this.spinner.showSpinner();
        this.editContactList();
      }
    });
  }

  selectState(val){
    console.log('state', val, this.country);
    const stateList = this.country.filter( e => e.country == val ); 
    console.log('state', val, stateList);
    this.state = stateList[0].state;
    console.log('state', val, this.state);

    this.city = [];
  }

  selectCity(val){
    const cityList = this.state.filter( e => e.name == val ); 
    this.city = cityList[0].city;
  }

  createForm() {
    this.userDetailsForm = this.fb.group({
      username: new FormControl('', Validators.compose([
       Validators.maxLength(25),
       Validators.minLength(5),
       Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
      ])),
      pincode: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      country: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      state: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    })
  }


  onSubmit(value) {
    const data = {
      name: value.username,
      email: value.email,
      address: value.address,
      pincode: value.pincode,
      country: value.country,
      state: value.state,
      city: value.city
    };
    this.spinner.showSpinner();
    if ( this.userId ){
      this.service.updatefunction(apiService.UPDATE_CONTACT + '/:' + atob(this.userId), data).subscribe( res => {
        if ( res.status === 0 ){
          this.toastr.snackBar(res.message, this.service.SUCCESS_TOAST);
          this.spinner.hideSpinner();
          this.route.navigateByUrl('admin/list-contact');
        } else {
          this.toastr.snackBar(res.message, this.service.ERROR_TOAST);
          this.spinner.hideSpinner();
        }
      });
    } else {
      this.service.postfunction(apiService.ADD_CONTACT, data).subscribe( res => {
        if ( res.status === 0 ){
          this.toastr.snackBar(res.message, this.service.SUCCESS_TOAST);
          this.spinner.hideSpinner();
          this.route.navigateByUrl('admin/list-contact');
        } else {
          this.toastr.snackBar(res.message, this.service.ERROR_TOAST);
          this.spinner.hideSpinner();
        }
      });
    }
  }
}

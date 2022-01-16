import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { CommonService } from 'src/app/service/commonSerivce/common.service';
import { apiService } from 'src/app/service/constants/apiurls.constants';
import { NotificationService } from 'src/app/service/notificationService/notification.service';
import { SpinnerService } from 'src/app/service/spinnerService/spinner-service.service';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  addProductForm: FormGroup;
  productId: any = {};

  addproduct_validation_message = {
    'productname': [
      { type: 'required', message: 'Product name is requried' },
    ],
    'productquantity': [
      { type: 'requried', message: 'Product quantity is requried' },
    ],
    'productrate': [
      { type: 'requried', message: 'Product rate is requried' }
    ]
  };

  constructor( private fb: FormBuilder, private service: CommonService, private spinner: SpinnerService, private toastr: NotificationService, private route: Router, private _route: ActivatedRoute ) {
    this._route.queryParams.subscribe( e => {
      this.productId = e["product"];
      
      if(this.productId){
        this.editContactList();
      }
    });
   }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addProductForm = this.fb.group({
      productname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      productquantity: new FormControl('', Validators.compose([
        Validators.required
      ])),
      productrate: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  async editContactList(){
    await  this.service.getfunction(apiService.VIEW_PRODUCT + '/:' + atob(this.productId)).subscribe( res => {
      console.log('name', res["data"]);
      if ( res.status === 0 ){
        this.spinner.showSpinner();
        this.addProductForm.setValue({
          productname: res["data"]["product_name"],
          productquantity: res["data"]["product_quantity"],
          productrate: res["data"]["product_rate"],
        })
      }
      this.spinner.hideSpinner();
    });
  }


  onSubmit(value) {
    console.log('Add-product values', value);
    const data = {
      product_name: value.productname,
      product_quantity: value.productquantity,
      product_rate: value.productrate
    };

    if ( this.productId ){
      this.spinner.showSpinner();
      this.service.updatefunction(apiService.UPDATE_PRODUCT + '/:' + atob(this.productId), data).subscribe( res => {
        console.log('res', res);
        if ( res.status === 0 ){
          this.toastr.snackBar(res.message, this.service.SUCCESS_TOAST);
          this.spinner.hideSpinner();
          this.route.navigateByUrl('/view-products');
        } else {
          this.toastr.snackBar(res.message, this.service.ERROR_TOAST);
          this.spinner.hideSpinner();
        }
      });
    } else {
      this.service.postfunction(apiService.ADD_PRODUCT, data).subscribe( res => {
        if ( res.status === 0 ){
          this.route.navigateByUrl('/view-products');
          this.toastr.snackBar(res.message, this.service.SUCCESS_TOAST);
        } else {
          this.toastr.snackBar(res.message, this.service.ERROR_TOAST);
        }
        }, err => {
        console.error('Error', err.message);
        });
    }
  }

}

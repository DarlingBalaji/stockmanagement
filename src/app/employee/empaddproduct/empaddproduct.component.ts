import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/service/commonSerivce/common.service';
import { apiService } from 'src/app/service/constants/apiurls.constants';


@Component({
  selector: 'app-empaddproduct',
  templateUrl: './empaddproduct.component.html',
  styleUrls: ['./empaddproduct.component.scss']
})
export class EmpaddproductComponent implements OnInit {

  eye: any = {};
  AllProducts: any = [];
  loginDetailsForm: FormGroup;

  login_validation_message = {
    productname: [
      { type: 'required', message: 'Product name is requried' },
    ],
    productquantity: [
      { type: 'requried', message: 'Product quantity is requried' },
    ],
  }

  constructor(private fb: FormBuilder, private service: CommonService) { }

  ngOnInit() {
    this.createForms();
    this.getDetails();
  }

  getDetails(): void{
    this.service.getfunction(apiService.VIEW_ALL_PRODUCT).subscribe( res => {
      this.AllProducts = res;
    });
  }

  createForms() {
    this.loginDetailsForm = this.fb.group({
      productname: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      productquantity: new FormControl('', Validators.compose([
        Validators.required
      ])),
    })
  }


  onSubmit(value) {
    console.log('Form values', value);
    const data = {
      productname: value.productname,
      productquantitypiece: value.productquantity
    };
    this.service.postfunction(apiService.addquantity, data).subscribe( res => {
      console.log('login res', res);
    });
  }

}

import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CommonService } from 'src/app/service/commonSerivce/common.service';
import { Observable } from 'rxjs';
import {map, retry, startWith} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { formatDate } from '@angular/common';
import { apiService } from 'src/app/service/constants/apiurls.constants';
import { NotificationService } from 'src/app/service/notificationService/notification.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})

export class BillingComponent implements OnInit, AfterViewInit {
  @ViewChild ('productcodeInput', {static: false}) productcodeInput;
  @ViewChild ('productnameInput', {static: false}) productnameInput;
  @ViewChild ('productquantityInput', {static: false}) productquantityInput;

  productList: any = [];
  ProductDetalis: any = [];
  ProductCode: any = [];
  ProductName: any = [];
  addProductForm: FormGroup;
  grantTotal: any = {};
  productRate: any = {};
  originalRate: any = {};

  // myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];


  filteredOptions: Observable<string[]>;
  filteredName: Observable<string[]>;

  today= new Date();
  todaysDataTime = '';

  constructor( private fb: FormBuilder, private service: CommonService, private toastr: NotificationService ) {
    this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy hh:mm a', 'en-US', '+0530');
    this.createForms();
    this.grantTotal = 0;
  }

  ngOnInit() {
    
    this.getProduct();

    // this.getInvoice();

    this.filteredOptions = this.addProductForm.get('productCode').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredName = this.addProductForm.get('productName').valueChanges.pipe(
      startWith(''),
      map(value => this._filterName(value))
    );

  }

  ngAfterViewInit(): void{
    // this.productcodeInput.nativeElement.focus();
   }

  createForms() {
    this.addProductForm = this.fb.group({
      productCode: new FormControl(),
      productName: new FormControl(),
      ProductQuantity: new FormControl(),
    })
  }

  get productForm() { return this.addProductForm.controls }

  private _filter(value: string) {
    if(value){
      const filterValue = value.toLowerCase();
      return this.ProductCode.filter(option => option.toLowerCase().includes(filterValue));
    } else 
      return null
  }

  private _filterName(value: string) {
    if(value){
      const filterValue = value.toLowerCase();
      return this.ProductName.filter(option => option.toLowerCase().includes(filterValue));
    } else
      return null
  }

  // Get Invoice
  getInvoice(): void{
    this.service.getfunction(apiService.generateInvoiceNumber).subscribe( res => {
      console.log(' Generate Invoice res', res);
    });
  }


  // Get Product
  getProduct(): void{
    this.service.getfunction(apiService.VIEW_ALL_PRODUCT).subscribe( res => {
      this.ProductDetalis = res.data;
      this.ProductCode = this.ProductDetalis.filter( e => e.qtypiece != 0 ).map( e => e.randomnumber );
      this.ProductName = this.ProductDetalis.filter( e => e.qtypiece != 0 ).map( e => e.product_name );
    });
  }


  // ON SELECT PRODUCT CODE 
  async product_Code(val: any){
    if (val){
      let productName = await this.ProductDetalis.filter( e => e.randomnumber == val )[0];

      if (!productName){
        this.productError();
        return;
      }

      this.addProductForm.patchValue({'productName': productName.product_name});
      this.productquantityInput.nativeElement.focus();
    }
  }

  // ON SELECT PRODUCT NAMW
  product_Name(val: any){
    if (val){
      let productCode = this.ProductDetalis.filter( e => e.product_name == val )[0];
  
      if ( !productCode){
        this.productError();
        return;
      }
  
      this.addProductForm.patchValue({'productCode': productCode.randomnumber});
      this.productquantityInput.nativeElement.focus();
    }
  }

  // ON CHANGE PRODUCT QUANTITU
  product_Quanity(val){
    let productCode = this.ProductDetalis.filter( e => e.randomnumber == this.productForm.productCode.value )[0];
    if (!productCode){
      this.productError();
      return;
    }
    if ( this.productForm.productName.value === productCode.product_name ){
      this.productRate = productCode.product_rate * val;
      this.originalRate = productCode.product_rate;
    } 
  }

  productError(){
    this.toastr.snackBar('Product not found', this.service.ERROR_TOAST);
    this.productcodeInput.nativeElement.focus();
  }

  async onSubmit(value){

    const listData = {
      code: value.productCode,
      name: value.productName,
      quantity: value.ProductQuantity,
      per_rate: this.originalRate,
      rate: this.productRate
    };
    
    if ( listData.code && listData.name && listData.quantity ){
      let productCode = await this.ProductDetalis.filter( e => e.randomnumber == this.productForm.productCode.value )[0];
      
      if (!productCode){
        this.productError();
        return;
      }


      if ( this.productForm.productName.value === productCode.product_name && this.productForm.productCode.value === productCode.randomnumber){

        for ( let data of this.productList ){
          if ( this.productForm.productCode.value == data.code ){
            console.log(data.code,'-----------', this.productList, '-------value----', this.productForm.productCode.value);
            let proCode = this.productList.map( m => m.code);
            console.log('same product', proCode.indexOf(this.productForm.productCode.value));
            let index =  proCode.indexOf(this.productForm.productCode.value)
            if(index != -1){
              console.log('---', this.productList[index]);
              this.productList[index].rate = this.productList[index].rate + parseFloat(listData.rate);
              this.productList[index].quantity = parseFloat(this.productList[index].quantity) + parseFloat(listData.quantity);
              console.log('tot', this.productList);

              this.addProductForm.reset();
              this.productcodeInput.nativeElement.focus();
              
              this.grantTotal = this.grantTotal + data.rate;
              return;
            }
          }
        }

        this.productList.push(listData);
        this.addProductForm.reset();
        this.productcodeInput.nativeElement.focus();
  
        this.grantTotal = 0;
        for ( let total of this.productList ){
          this.grantTotal = this.grantTotal + total.rate;
        }

      } else {
        this.productError();
        return;
      }
    }
  }

}

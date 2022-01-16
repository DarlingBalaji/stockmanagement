import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Route, Router } from '@angular/router';
import { CommonService } from 'src/app/service/commonSerivce/common.service';
import { apiService } from 'src/app/service/constants/apiurls.constants';
import { LocalstorageService } from 'src/app/service/localStorage/localstorage.service';
import { NotificationService } from 'src/app/service/notificationService/notification.service';
import { SpinnerService } from 'src/app/service/spinnerService/spinner-service.service';

export interface ViewAllProduct {
  sno: number;
  code: string;
  pieces: number;
  name: string;
  quantity: number;
  rate: number;
}


@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.scss']
})
export class ViewproductComponent implements OnInit, AfterViewInit  {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  displayedColumns: string[] = ['sno', 'randomnumber', 'product_name', 'product_quantity', 'product_rate', 'action'];
  dataSource = new MatTableDataSource<ViewAllProduct>(ELEMENT_DATA);
  allProducts: any = [];
  tempProducts: any = [];
  FilterOption: string;
  Stocks: any = [
    'All Products',
    'In Stock',
    'Warning Stocks',
    'Out of Stock',
  ]

  constructor( private service: CommonService, private router: Router, private toastr: NotificationService, private spinner: SpinnerService ) { }

  ngOnInit() {
    this.FilterOption = 'In Stock';
    this.getProduct();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Get Product
  getProduct(): void{
    this.spinner.showSpinner();
    this.service.getfunction(apiService.VIEW_ALL_PRODUCT).subscribe( res => {
      console.log('View all Product', res);
      if ( res.status === 0 ){
        let products = res.data;
        this.dataSource.data = products as ViewAllProduct[];
        this.tempProducts = products;
        this.spinner.hideSpinner();
      } else {
        this.toastr.snackBar(res.message, this.service.ERROR_TOAST);
        this.spinner.hideSpinner();
      }
    });
  }

  filterProduct(FilterVal): void{
    console.log('FilterVal', FilterVal);
    let product = [];
    if ( FilterVal === 'In Stock' ){
      product = this.tempProducts.filter( e => e.product_quantity != 0 );
      this.dataSource.data = product as ViewAllProduct[];
    } else if( FilterVal === 'Out of Stock' ){
      product = this.tempProducts.filter( e => e.product_quantity == 0 );
      this.dataSource.data = product as ViewAllProduct[];
    } else if ( FilterVal === 'All Products' ){
      product = this.tempProducts;
      this.dataSource.data = product as ViewAllProduct[];
    } else if ( FilterVal === 'Warning Stocks' ){
      product = this.tempProducts.filter( e => e.product_quantity <= 15 && e.product_quantity !=0 );
      this.dataSource.data = product as ViewAllProduct[];
    }
  }


   // TO EDIT PRODUCT
   async toEdit(id){
    let userId = window.btoa(id);
    console.log('_id', id, 'decode', atob(userId));
    this.router.navigate(['/admin/edit-product'], {queryParams: {product: userId}});
  }

  // TO DELETE PRODUCT
  toDelete(email){
    this.spinner.showSpinner();
    this.service.deletefunction(apiService.DELETE_PRODUCT, email).subscribe( res => {
      console.log('res', res);
      if ( res["status"] === 0 ){
        this.toastr.snackBar(res["message"], this.service.SUCCESS_TOAST);
        this.spinner.hideSpinner();
        this.getProduct();
      } else {
        this.toastr.snackBar(res["message"], this.service.ERROR_TOAST);
        this.spinner.hideSpinner();
      }
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


const ELEMENT_DATA: ViewAllProduct[] = [];
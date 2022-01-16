import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/commonSerivce/common.service';
import { apiService } from 'src/app/service/constants/apiurls.constants';
import { LocalstorageService } from 'src/app/service/localStorage/localstorage.service';
import { NotificationService } from 'src/app/service/notificationService/notification.service';
import { SpinnerService } from 'src/app/service/spinnerService/spinner-service.service';

export interface ViewAllProduct {
  sno: number;
  email: string;
  name: string;
  address: string;
  pincode: number;
  country: string;
  state: string;
  city: string;
}

@Component({
  selector: 'app-listcontact',
  templateUrl: './listcontact.component.html',
  styleUrls: ['./listcontact.component.scss']
})
export class ListcontactComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'name', 'email', 'address', 'pincode', 'country', 'state', 'city', 'action'];
  dataSource = new MatTableDataSource<ViewAllProduct>(ELEMENT_DATA);
  allProducts: any = [];
  tempProducts: any = [];

  constructor( private service: CommonService, private toastr: NotificationService, private router: Router, private spinner: SpinnerService ) { }

  ngOnInit() {
    this.getProducts();
  }

  // GET ALL PRODUCT
  getProducts(): void{
    this.spinner.showSpinner();
    this.service.getfunction(apiService.VIEW_ALL).subscribe( res => {
      console.log('View all Product', res);
      if ( res.status === 0 ){
        let products = res.data;
        this.dataSource.data = products as ViewAllProduct[];
        this.spinner.hideSpinner();
      } else {
        this.toastr.showError(res.message);
        this.spinner.hideSpinner();
      }
    });
  }

  // TO EDIT CONTACT
  async toEdit(id){
    let userId = window.btoa(id);
    console.log('_id', id, 'decode', atob(userId));
    this.router.navigate(['/admin/edit-contact'], {queryParams: {user: userId}});
  }

  // TO DELETE CONTACT
  toDelete(email){
    this.spinner.showSpinner();
    this.service.deletefunction(apiService.DELETE_CONTACT, email).subscribe( res => {
      console.log('res', res);
      if ( res["status"] === 0 ){
        this.toastr.snackBar(res["message"], this.service.SUCCESS_TOAST);
        this.getProducts();
        this.spinner.hideSpinner();
      } else {
        this.toastr.snackBar(res["message"], this.service.ERROR_TOAST);
        this.spinner.hideSpinner();
      }
    });
  }

  // SEARCH FILTER FUNCTION
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

const ELEMENT_DATA: ViewAllProduct[] = [];
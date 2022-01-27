import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/service/localStorage/localstorage.service';
import { MatSidenav } from '@angular/material';
import { CommonService } from 'src/app/service/commonSerivce/common.service';
import { CommonfunService } from 'src/app/service/commonFunction/commonfun.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public snav: MatSidenav;
  public profile: any = {};

  constructor( public localStorageService: LocalstorageService, private service: CommonService, public commonFun: CommonfunService ) { }

  ngOnInit() {
    this.getProfileData();
  }

  async getProfileData(){
    this.profile = await this.service.profileDetails();
  }

  toggle(): void{
    this.snav.open();
  }

}

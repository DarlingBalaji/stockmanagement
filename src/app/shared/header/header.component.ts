import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/service/localStorage/localstorage.service';
import { MatSidenav } from '@angular/material';
import { CommonService } from 'src/app/service/commonSerivce/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public snav: MatSidenav;
  public profile: any = {};

  constructor( public localStorageService: LocalstorageService, private _cd: ChangeDetectorRef, private service: CommonService ) { }

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

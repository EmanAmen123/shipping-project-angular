import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../core/services/login/login.service';

@Component({
  selector: 'app-merchant-side-bar',
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './merchant-side-bar.component.html',
  styleUrl: './merchant-side-bar.component.css'
})
export class MerchantSideBarComponent {
  constructor(private _LoginService:LoginService){}
  isActive = false;
   settingClicked:boolean=false
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
 
  
  logout(){
    this._LoginService.logout()
  }
}

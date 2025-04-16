import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../core/services/login/login.service';
@Component({
  selector: 'app-delivery-side-bar',
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './delivery-side-bar.component.html',
  styleUrl: './delivery-side-bar.component.css'
})
export class DeliverySideBarComponent {
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

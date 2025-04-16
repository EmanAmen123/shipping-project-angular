import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WeightsettingsModalComponent } from '../weightsettings-modal/weightsettings-modal.component';
import { LoginService } from '../../core/services/login/login.service';

@Component({
  selector: 'app-admin-sidebar',
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  constructor(private dialog: MatDialog,private _LoginService:LoginService){}
  isActive = false;
   settingClicked:boolean=false
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
   settingActive(){
    
    this.settingClicked=!this.settingClicked
    console.log(this.settingClicked)
    this.dialog.open(WeightsettingsModalComponent, {
      width: '600px',
      height:'400px',
      
      data: {} 
    });
   }

   openModal() {
    const dialogRef = this.dialog.open(WeightsettingsModalComponent, {
      width: '400px',
      data: { } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Modal result:', result);
      }
    });
  }
  logout(){
    this._LoginService.logout()
  }
}

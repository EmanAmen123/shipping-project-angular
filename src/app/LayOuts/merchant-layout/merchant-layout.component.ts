import { Component } from '@angular/core';
import { MerchantSideBarComponent } from "../../Components/merchant-side-bar/merchant-side-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-merchant-layout',
  imports: [MerchantSideBarComponent,RouterOutlet],
  templateUrl: './merchant-layout.component.html',
  styleUrl: './merchant-layout.component.css'
})
export class MerchantLayoutComponent {

}

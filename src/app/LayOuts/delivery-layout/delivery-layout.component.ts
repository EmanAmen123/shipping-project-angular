import { Component } from '@angular/core';
import { DeliverySideBarComponent } from "../../Components/delivery-side-bar/delivery-side-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-delivery-layout',
  imports: [DeliverySideBarComponent,RouterOutlet],
  templateUrl: './delivery-layout.component.html',
  styleUrl: './delivery-layout.component.css'
})
export class DeliveryLayoutComponent {

}

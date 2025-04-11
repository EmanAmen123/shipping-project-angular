import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
   titles:string[]=['New','On hold','Delivered to the representative','Delivered','Cant access','Postponed','Partially delivered'
    ,'Canceled by recipient','Payment rejected','Rejected with partial payment','Rejected and payment not made'
   ]
}

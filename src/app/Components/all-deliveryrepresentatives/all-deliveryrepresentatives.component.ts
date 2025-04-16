import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../core/services/adding/admin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-deliveryrepresentatives',
  imports: [],
  templateUrl: './all-deliveryrepresentatives.component.html',
  styleUrl: './all-deliveryrepresentatives.component.css'
})
export class AllDeliveryrepresentativesComponent implements OnInit,OnDestroy {
      Subscription:Subscription[]=[]

      constructor(private _AdminService:AdminService,private _ActivatedRoute:ActivatedRoute){}
       
      getDeliveryRepresentatives() {
        const all=  this._AdminService.getDeliveryRepresentative().subscribe({
           next: (res) => {
             console.log('delivery',res)
           },
           error: (err) => {
             console.error(err);
           },
         });
         this.Subscription.push(all)
       }
      ngOnInit(): void {
       this.getDeliveryRepresentatives()
      }
    

   
     ngOnDestroy(): void {
       this.Subscription.forEach(sub=>sub.unsubscribe())
     }
}

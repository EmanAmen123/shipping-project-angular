import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminOrdersService } from '../../core/services/orders/admin-orders.service';
import { ShowOrdersNavComponent } from "../show-orders-nav/show-orders-nav.component";
import { IOrder } from '../../core/interfaces/igeneral';

@Component({
  selector: 'app-show-orders',
  imports: [RouterLink, RouterLinkActive, ShowOrdersNavComponent],
  templateUrl: './show-orders.component.html',
  styleUrl: './show-orders.component.css'
})
export class ShowOrdersComponent implements OnInit,OnDestroy {
   Subscription:Subscription[]=[]
   searchWord!:string|null
    orders!:IOrder[]
    
    order?:IOrder

    empityOrder!:{data:[],message:string}
   constructor(private _AdminOrdersService:AdminOrdersService,private _ActivatedRoute:ActivatedRoute){}
    

   ngOnInit(): void {
    const ordersbyStatuscallingsubscription = this._ActivatedRoute.paramMap.subscribe((params: ParamMap) => {
      const status = params.get('status') || '';
      this.getOrdersByStatus(status);
    });
    this.Subscription.push(ordersbyStatuscallingsubscription)
   }
   getOrdersByStatus(status: string) {
   const ordersbyStatussubscription=  this._AdminOrdersService.getSpecificOrders(status).subscribe({
      next: (res) => {
        if (res.message !== 'No orders found with the given status.') {
          this.orders = res;
          console.log(this.orders)
        } else {
          this.orders = [];
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.Subscription.push(ordersbyStatussubscription)
  }
   deleteorder(orderId:number){
     const deleteordersubscription= this._AdminOrdersService.deleteOrder(orderId).subscribe(()=>{
        this.orders=this.orders.filter((order)=>{
             return order.id!=orderId
        })
      })
      this.Subscription.push(deleteordersubscription)
   }
   editOrder(orderId:number){
   this.order = this.orders.find((order)=>{
      return order.id==orderId
   })
   }

  ngOnDestroy(): void {
    this.Subscription.forEach(sub=>sub.unsubscribe())
  }
}

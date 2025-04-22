import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminOrdersService } from '../../core/services/orders/admin-orders.service';
import { ShowOrdersNavComponent } from "../show-orders-nav/show-orders-nav.component";
import { IOrder } from '../../core/interfaces/igeneral';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditOrderStatusModalComponent } from '../edit-order-status-modal/edit-order-status-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AssignorderModalComponent } from '../assignorder-modal/assignorder-modal.component';
import { LoginService } from '../../core/services/login/login.service';
@Component({
  selector: 'app-merchantorders',
  imports: [RouterLink, RouterLinkActive, ShowOrdersNavComponent,CommonModule,FormsModule],
  templateUrl: './merchantorders.component.html',
  styleUrl: './merchantorders.component.css'
})
export class MerchantordersComponent implements OnInit , OnDestroy {
  Subscription: Subscription[] = [];
  orders!: IOrder[];
  order?: IOrder;
  empityOrder!: { data: [], message: string };
  hasPendingOrders: boolean = false;
  selectedorderid!:number
  role!:string
  loading:boolean=false
  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  totalPages: number = 0;
  pageSizes: number[] = [5, 10, 25, 50];
  
  // Status tracking
  currentStatus: string = '';

  constructor(
    private _LoginService:LoginService,
    private _AdminOrdersService: AdminOrdersService,
    private _ActivatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.role=this._LoginService.role
    const ordersByStatusSubscription = this._ActivatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.currentStatus = params.get('status') || '';
        this.currentPage = 1;
        this.getOrdersByStatus();
      }
    );
    this.Subscription.push(ordersByStatusSubscription);
  }

  getOrdersByStatus(): void {
    this.loading=true
    const ordersSubscription = this._AdminOrdersService.getOrdersByStatus(
      this.currentStatus,
      this.currentPage,
      this.pageSize
    ).subscribe({
      next: (res) => {
        if (res.message !== 'No orders found with the given status.') {
          this.orders = res.orders;
          this.loading=false
          console.log('orders',res.orders)
          this.totalRecords = res.totalRecords;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
          this.pageSizes = [5, 10, 25, 50].filter(size => size < this.totalRecords);
if (!this.pageSizes.includes(this.totalRecords)) {
  this.pageSizes.push(this.totalRecords);
}
this.hasPendingOrders = this.orders?.some(order => order.orderStatus === 'Pending');
        } else {
          this.orders = [];
        }
      },
      error: (err) => console.error(err),
    });
    this.Subscription.push(ordersSubscription);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getOrdersByStatus(); 
    }
  }

  onPageSizeChange(event: Event): void {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.currentPage = 1;
    this.getOrdersByStatus(); 
  }

  deleteorder(orderId: number): void {
    const deleteSub = this._AdminOrdersService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter((order) => order.id !== orderId);
    });
    this.Subscription.push(deleteSub);
  }

  editOrder(orderId: number): void {
    this.order = this.orders.find((order) => order.id === orderId);
  }
 
 

  //////////////////////////
  ngOnDestroy(): void {
    this.Subscription.forEach((sub) => sub.unsubscribe());
  }

}

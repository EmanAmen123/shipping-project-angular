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
@Component({
  selector: 'app-delivery-orders',
  imports: [RouterLink, RouterLinkActive, ShowOrdersNavComponent,CommonModule,FormsModule],
  templateUrl: './delivery-orders.component.html',
  styleUrl: './delivery-orders.component.css'
})
export class DeliveryOrdersComponent implements OnInit,OnDestroy{
  Subscription: Subscription[] = [];
  orders!: IOrder[];
  order?: IOrder;
  empityOrder!: { data: [], message: string };
  hasPendingOrders: boolean = false;
  selectedorderid!:number
  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  totalPages: number = 0;
  pageSizes: number[] = [5, 10, 25, 50];

  // Status tracking
  currentStatus: string = 'Delivered';

  constructor(
    private _AdminOrdersService: AdminOrdersService,
    private _ActivatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
      this.getOrdersByStatus()
  }

  getOrdersByStatus(): void {
    const ordersSubscription = this._AdminOrdersService.getOrdersByStatus(
      this.currentStatus,
      this.currentPage,
      this.pageSize
    ).subscribe({
      next: (res) => {
        if (res.message !== 'No orders found with the given status.') {
          this.orders = res.orders;
          console.log('orders',res.orders)
          this.totalRecords = res.totalRecords;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
          this.pageSizes = [5, 10, 25, 50].filter(size => size < this.totalRecords);
if (!this.pageSizes.includes(this.totalRecords)) {
  this.pageSizes.push(this.totalRecords);
}
this.hasPendingOrders = this.orders.some(order => order.orderStatus === 'Pending');
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
  //////modal//////////////
  settingActive(orderid: number) {
    console.log(orderid);
    this.selectedorderid = orderid;
  
    const dialogRef = this.dialog.open(EditOrderStatusModalComponent, {
      width: '600px',
      height: '300px',
      data: { orderid }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
      console.log('Selected order ID:', this.selectedorderid);
  
      if (result === true) {
        this.orders = this.orders.filter(
          (order: IOrder) => order.id !== this.selectedorderid
        );
  
      }
    });
  }
  
 
  

  //////////////////////////
  ngOnDestroy(): void {
    this.Subscription.forEach((sub) => sub.unsubscribe());
  }
}

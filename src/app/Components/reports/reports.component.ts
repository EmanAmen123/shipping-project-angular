import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShowOrdersNavComponent } from "../show-orders-nav/show-orders-nav.component";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AdminService } from '../../core/services/adding/admin.service';
import { Subscription } from 'rxjs';
import { Ireport } from '../../core/interfaces/igeneral';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  imports: [ShowOrdersNavComponent,FormsModule,CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit,OnDestroy {
//   Subscription:Subscription[]=[]
//   searchWords : string[]=[ 'New' ,'Pending','Delivered','PartiallyDelivered','CanceledByRecipient','Rejected','PaymentPending',
//    'CannotBeReached','Processing','Shipped','AwaitingConfirmation']
//    reports:Ireport[]| null=[]
//    startDate!:Date
//    endDate!:Date
  
//   constructor(private _AdminService:AdminService,private _ActivatedRoute:ActivatedRoute){}
   

//   ngOnInit(): void {
  
//   }
//   getRebortByStatus(status: any) {
//     console.log('status',status.value)
//   const getReport=  this._AdminService.getRepportsByStatus(status.value).subscribe({
//      next: (res) => {
//        if (res.message !== 'No reports found with the given status.') {
//          this.reports = res;
//          console.log('reports',this.reports)
//        } else {
//          this.reports = null;
//        }
//      },
//      error: (err) => {
//        console.error('error',err);
//      },
//    });
//    this.Subscription.push(getReport)
//  }

 

// getData() {
//   if (!this.startDate || !this.endDate) {
//     console.warn('Dates are required.');
//     return;

//   }
//   this._AdminService.getRepportsByDate(this.startDate,this.endDate).subscribe({
//     next:res=> this.reports=res,
//     error:err=>console.log(err)
//   })}
//  ngOnDestroy(): void {
//    this.Subscription.forEach(sub=>sub.unsubscribe())
//  }


  Subscription: Subscription[] = [];
  searchWords: string[] = [
    'New', 'Pending', 'Delivered', 'PartiallyDelivered', 'CanceledByRecipient', 'Rejected', 'PaymentPending',
    'CannotBeReached', 'Processing', 'Shipped', 'AwaitingConfirmation'
  ];
  reports: Ireport[] | null = [];
  startDate!: Date;
  endDate!: Date;
  
  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  totalPages: number = 0;
  pageSizes: number[] = [];

  currentStatus: string = ''; // Track selected status

  constructor(private _AdminService: AdminService, private _ActivatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const sub = this._AdminService.getAllRepportsPaginated(this.currentPage, this.pageSize).subscribe({
      next: res => {
        if (res.message !== 'No reports found.') {
          console.log('res',res)
          this.reports = res;
          this.totalRecords = res.totalRecords;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
          console.log(this.reports)
          this.pageSizes = [5, 10, 25, 50].filter(size => size < this.totalRecords);
          if (!this.pageSizes.includes(this.totalRecords)) {
            this.pageSizes.push(this.totalRecords);
          }
        } else {
          this.reports = null;
        }
      },
      error: err => console.error('error', err),
    });
    this.Subscription.push(sub);
  }
  

  getRebortByStatus(event: Event) {
    const status = (event.target as HTMLSelectElement).value;
    this.currentStatus = status;
    this.currentPage = 1;
    this.fetchPaginatedReports();
  }

  fetchPaginatedReports() {
    const sub = this._AdminService.getRepportsByStatusPaginated(this.currentStatus, this.currentPage, this.pageSize).subscribe({
      next: res => {
        if (res.message !== 'No reports found with the given status.') {
          this.reports = res.orders;
          console.log(res)
          this.totalRecords = res.totalRecords;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);

          this.pageSizes = [5, 10, 25, 50].filter(size => size < this.totalRecords);
          if (!this.pageSizes.includes(this.totalRecords)) {
            this.pageSizes.push(this.totalRecords);
          }
        } else {
          this.reports = null;
        }
      },
      error: err => console.error('error', err),
    });
    this.Subscription.push(sub);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchPaginatedReports();
    }
  }

  onPageSizeChange(event: Event): void {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.currentPage = 1;
    this.fetchPaginatedReports();
  }

  getData() {
    if (!this.startDate || !this.endDate) {
      console.warn('Dates are required.');
      return;
    }

    const sub = this._AdminService.getRepportsByDate(this.startDate, this.endDate).subscribe({
      next: res => this.reports = res,
      error: err => console.log(err),
    });

    this.Subscription.push(sub);
  }

  ngOnDestroy(): void {
    this.Subscription.forEach(sub => sub.unsubscribe());
  }
}


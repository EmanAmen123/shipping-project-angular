import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/adding/admin.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { WeightsettingsModalComponent } from '../weightsettings-modal/weightsettings-modal.component';

@Component({
  selector: 'app-admin-home',
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit,OnDestroy {
    private destroy$ = new Subject<void>();
  
   titles:string[]=['New','On hold','Delivered to the representative','Delivered','Cant access','Postponed','Partially delivered'
    ,'Canceled by recipient','Payment rejected','Rejected with partial payment','Rejected and payment not made'
   ]

   icons:string[]=['fa-regular fa-file-lines','fa-regular fa-user','fa-regular fa-clock','fa-regular fa-calendar-days','fa-regular fa-envelope',
    'fa-regular fa-circle-check',
   ]

   counts:any={}
   private readonly _AdminService=inject(AdminService)
   private readonly dialog=inject(MatDialog)
   openWeightSettings() {
    this.dialog.open(WeightsettingsModalComponent, {
      width: '600px', 
      data: {  }
    });
  }
  titleKeyMap: { title: string; key: string }[] = [
    { title: 'New', key: 'New' },
    { title: 'On hold', key: 'Pending' },
    { title: 'Delivered to the representative', key: 'Shipped' },
    { title: 'Delivered', key: 'Delivered' },
    { title: 'Cant access', key: 'CannotBeReached' },
    { title: 'Postponed', key: 'Processing' },
    { title: 'Partially delivered', key: 'PartiallyDelivered' },
    { title: 'Canceled by recipient', key: 'CanceledByRecipient' },
    { title: 'Payment rejected', key: 'PaymentPending' },
    { title: 'Rejected with partial payment', key: 'Rejected' },
    { title: 'Rejected and payment not made', key: 'AwaitingConfirmation' }
  ];
  
  ngOnInit(): void {
     this._AdminService.getCounts().pipe(takeUntil(this.destroy$)).subscribe({
      next:res=>{this.counts=res
        console.log(this.counts)
      },
      error:err=>console.log(err)
     })
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

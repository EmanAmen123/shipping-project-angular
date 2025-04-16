import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AdminService } from '../../core/services/adding/admin.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-assignorder-modal',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule,FormsModule],
  templateUrl: './assignorder-modal.component.html',
  styleUrl: './assignorder-modal.component.css'
})
export class AssignorderModalComponent implements OnInit{
    private destroy$ = new Subject<void>();
  
  searchStatus:string[]=["Pending","CanceledByRecipient"]
  selectedid!: number ;
  errmsg:string=""
  delivery!:any
  constructor(
    public dialogRef: MatDialogRef<AssignorderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderid: number,gov:string },
    private _AdminService: AdminService
  ) {
  }

  ngOnInit(): void {
    console.log('orderid',this.data.orderid)
    console.log('gov',this.data.gov)
    this._AdminService.getGovDelivery(this.data.gov).pipe(takeUntil(this.destroy$)).subscribe({
            next: response => {
              console.log('delivery', response)
               this.delivery=response
                 
              }
            ,
            error: (error )=> {
            console.log(error)
            },
          });
  }
  updateStatus() {
  
    this._AdminService.assignOrder(this.selectedid,this.data.orderid).subscribe({
      next: (res) => {
        console.log('assigned:', res);
        this.dialogRef.close(true); 
      },
      error: (err) => {
       this.errmsg="you should select one option"
        console.error('Failed to assign:', err);
      }
    });
  }
  closeModal() {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}

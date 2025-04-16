import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AdminService } from '../../core/services/adding/admin.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-order-status-modal',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule,FormsModule,MatSnackBarModule],
  templateUrl: './edit-order-status-modal.component.html',
  styleUrl: './edit-order-status-modal.component.css'
})
export class EditOrderStatusModalComponent {
  // searchStatus:string[]=["New","Pending","Delivered","PartiallyDelivered","CanceledByRecipient","Rejected","PaymentPending",
  //   "CannotBeReached","Processing","Shipped","AwaitingConfirmation"
  // ]
  searchStatus:string[]=["Pending","CanceledByRecipient"]
  selectedStatus: string = '';
  constructor(
    public dialogRef: MatDialogRef<EditOrderStatusModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderid: number },
    private _AdminService: AdminService,
    private snackBar: MatSnackBar
  ) {
  }


  updateStatus() {
    const newStatus = {
      orderId: this.data.orderid,
      status: this.selectedStatus
    };
  
    this._AdminService.changeOrderStatus(newStatus.orderId,newStatus.status).subscribe({
      next: (res) => {
        console.log(newStatus)
        console.log('Status updated successfully:', res);
       this.showMessage()
        this.dialogRef.close(true); 
      },
      error: (err) => {
        console.log(newStatus)
        
        console.error('Failed to update status:', err);
      }
    });

  }

  showMessage() {
    this.snackBar.open('Status UPDATED!', 'Close', {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    })
  }
   showErrMessage() {
    this.snackBar.open('Something Wrong', 'Close', {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    })
  }
  closeModal() {
    this.dialogRef.close();
  }
}

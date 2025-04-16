import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/adding/admin.service';
import { GovernratesService } from '../../core/services/governrates/governrates.service';
@Component({
  selector: 'app-edit-govrn-modal',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './edit-govrn-modal.component.html',
  styleUrl: './edit-govrn-modal.component.css'
})
export class EditGovrnModalComponent {
  name: string = '';
  constructor(
    public dialogRef: MatDialogRef<EditGovrnModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { govid: number },
    private _GovernratesService: GovernratesService
  ) {
  }


  newdata() {
    
  
    this._GovernratesService.editGovernrate(this.name,this.data.govid).subscribe({
      next: (res) => {
        console.log(' updated :', res);
        this.dialogRef.close(true); 
      },
      error: (err) => {
        console.log(err)

        console.error('Failed to update name:', err);
      }
    });
  }
  closeModal() {
    this.dialogRef.close();
  }
}

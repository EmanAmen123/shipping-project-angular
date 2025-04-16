import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/adding/admin.service';

@Component({
  selector: 'app-weightsettings-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './weightsettings-modal.component.html',
  styleUrls: ['./weightsettings-modal.component.css']
})
export class WeightsettingsModalComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<WeightsettingsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _FormBuilder: FormBuilder,
    private _AdminService: AdminService
  ) {
    this.form = this._FormBuilder.group({
      defualtWeight: ['',[Validators.required]],
      extraPricePerKilo: ['',[Validators.required]]
    });
  }
  get defualtWeight(){
    return this.form.controls['defualtWeight']
  }
  get extraPricePerKilo(){
    return this.form.controls['extraPricePerKilo']
  }
  submitForm() {
    if (this.form.valid ) {
    const formData = this.form.value;
    this._AdminService.addWeightSetting(formData).subscribe(response => {
      console.log('adding response:', response);
      this.dialogRef.close(response);
    });
  }else {
    console.log('Form is invalid',this.form.value);
    this.form.markAllAsTouched()
  }


}
  closeModal() {
    this.dialogRef.close();
  }
}

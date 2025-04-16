import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Ibranch, IGovernrate } from '../../core/interfaces/igeneral';
import { GovernratesService } from '../../core/services/governrates/governrates.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../core/services/adding/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminBranchesService } from '../../core/services/branches/admin-branches.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-adding-representative',
  imports: [ReactiveFormsModule,CommonModule, MatFormFieldModule,  MatSelectModule],
  templateUrl: './adding-representative.component.html',
  styleUrl: './adding-representative.component.css'
})
export class AddingRepresentativeComponent implements OnInit,OnDestroy {
  private destroy$ = new Subject<void>();
  addForm: FormGroup;

  formErrorMsg:[]=[]
  loading:boolean=false
  spacificOrder!:any
  governrates!:IGovernrate[]
  branches!:Ibranch[]
  selectedGovernrateId: number | null = null;
 constructor( private _GovernratesService:GovernratesService,private _FormBuilder: FormBuilder,private _AdminBranchesService:AdminBranchesService,private _Router:Router,private _AdminService:AdminService) {
   this.addForm = this._FormBuilder.group({
    name: ['', [Validators.required,Validators.minLength(3)]],
    email: ['', [Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.pattern(/^(?=[A-Z])(?=.*@)(?=.*\d).+$/)]],
    governorateId: ['',Validators.required],
    phoneNumber: ['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    address: ['',[Validators.required]],
    typeOfDiscount:['',[Validators.required]],
    companyPercent: ['',Validators.required],
    branchesId: [[], Validators.required]
   });

 }


 onSubmit() {
   
   if (this.addForm.valid) {
     this.loading=true
     const data = this.addForm.value;
     console.log('Submitting Order:', data);
     this._AdminService.addDeliveryRepresentative(data).pipe(takeUntil(this.destroy$)).subscribe({
       next: response => {
         console.log('Added', response)
         this.loading=false
         // if(response.message==''){
         //   setTimeout(() => {
         //      this._Router.navigate(['/home'])
         //   }, 1000);
            
         // }
       },
       error: (error )=> {
        console.log(error)
        this.formErrorMsg = error.error.details
      //  this.formErrorMsg=error.error
       this.loading=false
       },
     });
   } else {
     console.log('Form is invalid');
     this.addForm.markAllAsTouched()
   }
 }


 ngOnInit(): void {
   console.log('hg',this.formErrorMsg)
   this.getGovernrates()
   this.getbranches()
   
  }
   /////////////// branches ///////////////////////////////
   getbranches(){
   this._AdminBranchesService.getBranches().pipe(takeUntil(this.destroy$)).subscribe({
    next:(res)=>{
      this.branches=res
       console.log('branches',res)
    },
    error:(err)=>{
      console.log(err)
    },
   
   })
  }
  /////////////// governrates ///////////////////////////////
  getGovernrates(){
    this._GovernratesService.getAllGovernrates().pipe(takeUntil(this.destroy$)).subscribe({
     next:(res)=>{
       this.governrates=res
        console.log('gv',res)
     },
     error:(err)=>{
       console.log(err)
     },
    
    })
   }
 get name(){
   return this.addForm.controls['name']
  }
 get email(){
   return this.addForm.controls['email']
  }
 get password(){
   return this.addForm.controls['password']
  }

 get governorateId(){
   return this.addForm.controls['governorateId']
  }
 get phoneNumber(){
   return this.addForm.controls['phoneNumber']
  }
 get address(){
   return this.addForm.controls['address']
  }
 get typeOfDiscount(){
   return this.addForm.controls['typeOfDiscount']
  }
 get companyPercent(){
   return this.addForm.controls['companyPercent']
  }
  get branchIdsControl(): FormControl {
    return this.addForm.get('branchesId') as FormControl;
  }


  slide(){
  //  this.isvallage=!this.isvallage

  //  this.isVillageDelivery.setValue(this.isvallage)
  //  console.log("is village",this.isVillageDelivery.value)
  }
  
 ngOnDestroy(): void {
   this.destroy$.next();
   this.destroy$.complete(); 
}
}

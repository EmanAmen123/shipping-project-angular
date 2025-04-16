import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../core/services/adding/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminBranchesService } from '../../core/services/branches/admin-branches.service';
import { Ibranch } from '../../core/interfaces/igeneral';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
  private destroy$ = new Subject<void>();

   addForm: FormGroup;
   branches:Ibranch[]=[]
   branch?:Ibranch
   id!:any
   formErrorMsg:string=""
   loading:boolean=false
   selectedGovernrateId: number | null = null;
  constructor(private _FormBuilder: FormBuilder,private _ActivatedRoute:ActivatedRoute,private _Router:Router,private _AdminService:AdminService,private _AdminBranchesService:AdminBranchesService) {
    this.addForm = this._FormBuilder.group({
      name: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['',[Validators.required]],
      address: ['',[Validators.required,Validators.minLength(5)]],
      userRole: 'Admin',
      phoneNumber: ['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
      branchId: ['',Validators.required],
      
    });
  }
 
  onSubmit() {
    if (this.addForm.valid) {
      this.loading=true
      const data = this.addForm.value;
      console.log('Submitting:', data);
      this._AdminService.addEmployee(data).pipe(takeUntil(this.destroy$)).subscribe({
        next: response => {
          console.log('adding employee', response)
          this.loading=false
          // if(response.message==''){
          //   setTimeout(() => {
          //      this._Router.navigate(['/home'])
          //   }, 1000);
             
          // }
        },
        error: (error )=> {
        // this.formErrorMsg=error.message
        console.log(error)
        this.loading=false
        
        },
      });
    } else {
      console.log('Form is invalid');
      this.addForm.markAllAsTouched()
    }
  }
  


  ngOnInit(): void {
    ///////////// Edit Order///////////////////////////////
    this._ActivatedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe({
      next:(params)=>{
        this.id=params.get('id')
        // this.customerName.setValue('')
        // this.customerEmail.setValue('')
        // this.customerPhone.setValue('')
      }
     })
     if(this.id!=0){
       this._AdminService.getEmployeeById(this.id).pipe(takeUntil(this.destroy$)).subscribe({
        next:(res)=>{
          console.log('order by id',res)
          this.name.setValue(res.name)
          this.email.setValue(res.email)
          this.phoneNumber.setValue(res.phoneNumber)
          this.branchId.setValue(this.branch)
          this.userRole.setValue(res.userRole)
        }
       })
     }
    /////////////// branch options///////////////////////////////
    this._AdminBranchesService.getBranches().pipe(takeUntil(this.destroy$)).subscribe({
     next:(res)=>{
       this.branches=res
        console.log(res)
        console.log(this.branches)
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
  get address(){
    return this.addForm.controls['address']
   }
  get userRole(){
    return this.addForm.controls['userRole']
   }
  get phoneNumber(){
    return this.addForm.controls['phoneNumber']
   }
  get branchId(){
    return this.addForm.controls['branchId']
   }
  
   getBranch(){
   this.branch= this.branches.find((branch)=>{
      return branch.id==this.id
    })
   }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

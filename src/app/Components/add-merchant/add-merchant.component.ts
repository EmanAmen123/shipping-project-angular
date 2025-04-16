import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Ibranch, ICity, IGovernrate } from '../../core/interfaces/igeneral';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GovernratesService } from '../../core/services/governrates/governrates.service';
import { ShippingService } from '../../core/services/shipping/shipping.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminBranchesService } from '../../core/services/branches/admin-branches.service';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../core/services/adding/admin.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-merchant',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule,  MatSelectModule],
  templateUrl: './add-merchant.component.html',
  styleUrl: './add-merchant.component.css'
})
export class AddMerchantComponent implements OnInit,OnDestroy {
  private destroy$ = new Subject<void>();
  branches:Ibranch[]=[]
  form: FormGroup;
  formErrorMsg:string=""
  loading:boolean=false
  governrates!:IGovernrate[]
  selectedGovernrateId: number | null = null;
  cities!:ICity[]
  gvrnCities!: ICity[]
 constructor(private _GovernratesService:GovernratesService,private _AdminService:AdminService,private _FormBuilder: FormBuilder,private _ActivatedRoute:ActivatedRoute,private _Router:Router,private _AdminBranchesService:AdminBranchesService) {
   this.form = this._FormBuilder.group({
     pickUpPrice: ['', [Validators.required,Validators.min(10)]],
     rejectedOrderPrice: ['', [Validators.required]],
     cityId: [0,Validators.required],
     governorateId: [0,Validators.required],
     userName:['',[Validators.required,Validators.minLength(4)]],
     phoneNumber:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
     email: ['',[Validators.required,Validators.email]],
     password: ['',[Validators.required]],
     address: ['',[Validators.required,Validators.minLength(6)]],
    
     specialPackages: this._FormBuilder.array([]),
     branchIds: [[], Validators.required]

   });

   this.addSpecialPeckage();
 }

 get specialPackages(): FormArray {
   return this.form.get('specialPackages') as FormArray;
 }

 newProduct(): FormGroup {
   return this._FormBuilder.group({
    cityID: ['',[Validators.required]],
    governorateID: ['',[Validators.required]],
    shippingPrice: ['',[Validators.required,Validators.min(20)]],
   });
 }

 addSpecialPeckage() {
   this.specialPackages.push(this.newProduct());
 }

 removespecialPackage(index: number) {
   this.specialPackages.removeAt(index);
 }

 onSubmit() {
   
   if (this.form.valid) {
     this.loading=true
     const merchantData = this.form.value;
     console.log('Submitting merchant:', merchantData);
     this._AdminService.addmerchant(merchantData).pipe(takeUntil(this.destroy$)).subscribe({
       next: response => {
         console.log('Order submitted!', response)
         this.loading=false
         // if(response.message==''){
         //   setTimeout(() => {
         //      this._Router.navigate(['/home'])
         //   }, 1000);
            
         // }
       },
       error: (error)=> {
       this.formErrorMsg=error
       console.log(error)
       this.loading=false
       },
     });
   } else {
     console.log('Form is invalid');
     this.form.markAllAsTouched()
   }
 }
  
 
 ngOnInit(): void {
  
   /////////////// governrates options///////////////////////////////
   this._GovernratesService.getAllGovernrates().pipe(takeUntil(this.destroy$)).subscribe({
    next:(res)=>{
      this.governrates=res
       console.log(res)
       console.log(this.governrates)
    },
    error:(err)=>{
      console.log(err)
    },
   
   })

   /////////////// Branch options///////////////////////////////

   this._AdminBranchesService.getBranches().pipe(takeUntil(this.destroy$)).subscribe({
    next:(res)=>{
       console.log(res)
      this.branches=res
    },
    error:(err)=>{
     console.log(err)
   },
   })
  

  
   /////////////////////////////////////////////////
   this.specialPackages.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
     this.calculateTotals();
   });
 }
  /////////////// Cities options///////////////////////////////
  onGovernrateChange(event: Event) {
   const selectElement = event.target as HTMLSelectElement;
   const selectedGovernrateId = Number(selectElement.value)
   this._GovernratesService.getAllCities().pipe(takeUntil(this.destroy$)).subscribe({
     next:(data)=>{
       this.cities = data;
      this.gvrnCities= this.cities.filter((city)=>{
         return city.govId==selectedGovernrateId
       })
     },
     error:(err)=>{
       console.log(err)
     }
   })
    
 }

 calculateTotals() {
   const specialPackages = this.specialPackages.value;
 
   let totalWeight = 0;
 
   for (let product of specialPackages) {
     if (!product.isDeleted) {
       const quantity = Number(product.quantity) || 0;
       const weight = Number(product.weight) || 0;
 
       totalWeight += quantity* weight;
     }
   }
   this.form.patchValue({
     totalWeight: totalWeight,
   }, { emitEvent: false }); 
 }

 get pickUpPrice(){
   return this.form.controls['pickUpPrice']
  }
 get rejectedOrderPrice(){
   return this.form.controls['rejectedOrderPrice']
  }
 get customerEmail(){
   return this.form.controls['customerEmail']
  }
 get cityId(){
   return this.form.controls['cityId']
  }
 get governorateId(){
   return this.form.controls['governorateId']
  }
 get email(){
   return this.form.controls['email']
  }
 get password(){
   return this.form.controls['password']
  }
 
 get address(){
   return this.form.controls['address']
  }
 get phoneNumber(){
   return this.form.controls['phoneNumber']
  }

 get userName(){
   return this.form.controls['userName']
  }
  get branchIdsControl(): FormControl {
    return this.form.get('branchIds') as FormControl;
  }
  // addBranchId(id: number) {
  //   this.branchIds.push(this._FormBuilder.control(id));
  // }
 
  
 ngOnDestroy(): void {
   this.destroy$.next();
   this.destroy$.complete();
 }

}

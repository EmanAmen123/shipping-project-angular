import { routes } from './../../app.routes';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { GovernratesService } from '../../core/services/governrates/governrates.service';
import { ShippingService } from '../../core/services/shipping/shipping.service';
import { AdminOrdersService } from '../../core/services/orders/admin-orders.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IGovernrate,ICity,IOrder,iShippingtypes, Ibranch } from '../../core/interfaces/igeneral';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminBranchesService } from '../../core/services/branches/admin-branches.service';
import { AdminService } from '../../core/services/adding/admin.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-merchant-order',
  imports: [CommonModule, ReactiveFormsModule, FormsModule ,  MatSnackBarModule],
  templateUrl: './merchant-order.component.html',
  styleUrl: './merchant-order.component.css'
})
export class MerchantOrderComponent {
  private destroy$ = new Subject<void>();
  isvallage:boolean=false
  branches:Ibranch[]=[]
  orderForm: FormGroup;
  orderId!:any
  formErrorMsg:string=""
  loading:boolean=false
  spacificOrder!:any
  governrates!:IGovernrate[]
  selectedGovernrateId: number | null = null;
  selectedCityeId: number | null = null;
  selectedpaymentId: number | null = null;
   edit:boolean=false
  shippingTypes!:iShippingtypes[]
  cities!:ICity[]
  gvrnCities!: ICity[]
  oldgvrn:any=""
  oldcity:any=""
  oldbranch:any=""
  merchants!:any
 constructor(private _AdminOrdersService:AdminOrdersService,private snackBar: MatSnackBar,private _AdminService:AdminService, private _GovernratesService:GovernratesService,private _ShippingService:ShippingService,private _FormBuilder: FormBuilder,private _ActivatedRoute:ActivatedRoute,private _Router:Router,private _AdminBranchesService:AdminBranchesService) {
   this.orderForm = this._FormBuilder.group({
     customerName: ['', [Validators.required,Validators.minLength(3)]],
     customerPhone: ['', [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
     customerEmail: ['',[Validators.required,Validators.email]],
     cityId: ['',Validators.required],
     governorateId: ['',Validators.required],
     merchentId:0,
     shippingTypeId: ['',Validators.required],
     orderStatus: ['New'],
     isVillageDelivery:false,
     villageStreetAddress: [''],
     orderPrice: ['',Validators.required],
     totalWeight: [],
     branchId:['',Validators.required],
     phonenumber:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],  //for merchant
     address:['',[Validators.required,Validators.minLength(3)]],        //for merchant
     paymentType: ['',Validators.required],
     shippingMethod: ['',Validators.required],
     products: this._FormBuilder.array([]),
   });

   // Add one product by default
   this.addProduct();
 }

 get products(): FormArray {
   return this.orderForm.get('products') as FormArray;
 }

 newProduct(): FormGroup {
   return this._FormBuilder.group({
     isDeleted: [false],
     name: ['', [Validators.required,Validators.minLength(3)]],
     quantity: [1, [Validators.required, Validators.min(1)]],
     weight: [0, [Validators.required, Validators.min(0.1)]],
   });
 }

 addProduct() {
   this.products.push(this.newProduct());
 }

 removeProduct(index: number) {
   this.products.removeAt(index);
 }

 onSubmit() {
   if(this.orderId==0){
     this.edit=false
   if (this.orderForm.valid ) {
     this.loading=true
     const orderData = this.orderForm.value;
     console.log('Submitting Order:', orderData);
     this._AdminOrdersService.addOrder(orderData).pipe(takeUntil(this.destroy$)).subscribe({
       next: response => {
         console.log('Order submitted!', response)
         this.loading=false
         
         if(response.statusCode==200){
           this.showMessage()
           setTimeout(() => {
              this._Router.navigate(['/orders','New'])
           }, 1000);
            
         }
       },
       error: (error )=> {
         this.showErrMessage()
       this.formErrorMsg=error
       console.log(error)
       this.loading=false
       },
     });
   } else {
     this.showErrMessage()
     console.log('Form is invalid',this.orderForm.value);
     this.orderForm.markAllAsTouched()

   }
 }
 else{
   if (this.orderForm.valid ) {
     this.loading=true
     const orderData = this.orderForm.value;
     console.log('Submitting Order:', orderData);
     this._AdminOrdersService.editOrders(orderData,this.orderId).pipe(takeUntil(this.destroy$)).subscribe({
       next: response => {
         console.log('Order submitted!', response)
         this.loading=false

         if(response.statusCode==200){
           this.showMessage()
           setTimeout(() => {
              this._Router.navigate(['/orders','New'])
           }, 1000);
            
         }
       },
       error: (error)=> {
         console.log(error)
       this.formErrorMsg=error
       this.loading=false
       this.showErrMessage()
       },
     });
   } else {
     console.log('Form is invalid',this.orderForm.value);
     this.orderForm.markAllAsTouched()
     this.showErrMessage()
   }
 }
 }
  
 gitOneOrder(){
   this._AdminOrdersService.getOrders().pipe(takeUntil(this.destroy$)).subscribe({
     next:(response)=>{
        this.spacificOrder=response.filter((order:IOrder)=>{
            return order.id==this.orderId
        })
        console.log('the order',this.spacificOrder)
      this.customerName.setValue(this.spacificOrder.customerName)
      this.customerEmail.setValue(this.spacificOrder.customerEmail)
      this.customerPhone.setValue(this.spacificOrder.customerPhone)

     },error:(err)=>{console.log(err)}
   })
 }
 ngOnInit(): void {
   /////////////// Edit Order///////////////////////////////
   this._ActivatedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe({
     next:(params)=>{
       this.orderId=params.get('orderId')
       // this.customerName.setValue('')
       // this.customerEmail.setValue('')
       // this.customerPhone.setValue('')
     }
    })
    if(this.orderId!=0){
     this.edit=true
      this._AdminOrdersService.getOrderById(this.orderId).pipe(takeUntil(this.destroy$)).subscribe({
       next:(res)=>{
         console.log('order by id',res)
         this.customerName.setValue(res.customerName)
         this.customerEmail.setValue(res.customerEmail)
         this.customerPhone.setValue(res.customerPhone)
         this.cityId.setValue(res.cityId)
         this.isvallage=res.isVillageDelivery
         this.isVillageDelivery.setValue(res.isVillageDelivery)
         this.villageStreetAddress.setValue(res.villageStreetAddress)
         this.paymentType.setValue(res.paymentType)
         this.shippingMethod.setValue(res.shippingMethod)
         this.governorateId.setValue(res.governorateId)
         this.shippingTypeId.setValue(res.shippingTypeId)
         this.totalWeight.setValue(res.totalWeight)
         this.merchantphonenumber.setValue(res.phonenumber)
         this.merchantAddress.setValue(res.address)
         this.price.setValue(res.orderPrice)
         this.branchId.setValue(res.branchId)
         this.selectedCityeId=res.cityId
         // this.oldgvrn=this.governrates.find((g)=>g.id==this.governorateId.value)?.name
         // console.log(this.oldgvrn)
         this.products.clear();
         res.products.forEach((product: any) => {
           this.products.push(this._FormBuilder.group({
             isDeleted: [product.isDeleted || false],
             name: [product.name || '', Validators.required],
             quantity: [product.quantity || 1, [Validators.required, Validators.min(1)]],
             weight: [product.weight || 0.1, [Validators.required, Validators.min(0.1)]],
           }));
         });
       }
      })
    }
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

   /////////////// shipping options///////////////////////////////

   this._ShippingService.getAllShippingTypes().pipe(takeUntil(this.destroy$)).subscribe({
    next:(res)=>{
       console.log(res)
       this.shippingTypes=res
    },
    error:(err)=>{
     console.log(err)
   },
   })
   /////////////// Branch options///////////////////////////////

   this._AdminBranchesService.getBranches().pipe(takeUntil(this.destroy$)).subscribe({
    next:(res)=>{
       console.log('branches',res)
      this.branches=res
      console.log('branches array',res)

    },
    error:(err)=>{
     console.log(err)
   },
   })
   /////////////// merchant options///////////////////////////////

   this._AdminService.getAllMerchants().pipe(takeUntil(this.destroy$)).subscribe({
    next:(res)=>{
       console.log('merchants',res)
      this.merchants=res
      console.log('merchants array',res)

    },
    error:(err)=>{
     console.log(err)
   },
   })
  

  
   /////////////////////////////////////////////////
   this.products.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
     this.calculateTotals();
   });
 }
  /////////////// Cities options///////////////////////////////
  onGovernrateChange() {
  console.log('gov id',this.selectedGovernrateId)
   // const selectElement = event.target as HTMLSelectElement;
   // const selectedGovernrateId = Number(selectElement.value)
   this._GovernratesService.getAllCities().pipe(takeUntil(this.destroy$)).subscribe({
     next:(data)=>{
       this.cities = data;
      this.gvrnCities= this.cities.filter((city)=>{
         return city.govId==this.selectedGovernrateId
       })
     },
     error:(err)=>{
       console.log(err)
     }
   })
    
 }

 calculateTotals() {
   const products = this.products.value;
 
   let totalWeight = 0;
 
   for (let product of products) {
     if (!product.isDeleted) {
       const quantity = Number(product.quantity) || 0;
       const weight = Number(product.weight) || 0;
 
       totalWeight += quantity* weight;
     }
   }
   this.orderForm.patchValue({
     totalWeight: totalWeight,
   }, { emitEvent: false }); 
 }

 get customerName(){
   return this.orderForm.controls['customerName']
  }
 get customerPhone(){
   return this.orderForm.controls['customerPhone']
  }
 get customerEmail(){
   return this.orderForm.controls['customerEmail']
  }
 get cityId(){
   return this.orderForm.controls['cityId']
  }
 get governorateId(){
   return this.orderForm.controls['governorateId']
  }
 get shippingTypeId(){
   return this.orderForm.controls['shippingTypeId']
  }
 get orderStatus(){
   return this.orderForm.controls['orderStatus']
  }
 get isVillageDelivery(){
   return this.orderForm.controls['isVillageDelivery']
  }
 get villageStreetAddress(){
   return this.orderForm.controls['villageStreetAddress']
  }
 get paymentType(){
   return this.orderForm.controls['paymentType']
  }
 get shippingMethod(){
   return this.orderForm.controls['shippingMethod']
  }
 get price(){
   return this.orderForm.controls['orderPrice']
  }
 get totalWeight(){
   return this.orderForm.controls['totalWeight']
  }
  get merchantphonenumber(){
    return this.orderForm.controls['phonenumber']
  }
  get merchantAddress(){
    return this.orderForm.controls['address']
  }
  get branchId(){
    return this.orderForm.controls['branchId']
  }
 

  showMessage() {
   this.snackBar.open('Action completed!', 'Close', {
     duration: 2000,
     verticalPosition: 'top',
     panelClass: ['custom-snackbar']
   })
 }
  showErrMessage() {
   this.snackBar.open('InValid Data', 'Close', {
     duration: 2000,
     verticalPosition: 'top',
     panelClass: ['custom-snackbar']
   })
 }

  slide(){
   this.isvallage=!this.isvallage

   this.isVillageDelivery.setValue(this.isvallage)
   console.log("is village",this.isVillageDelivery.value)
  }
  

  
 ngOnDestroy(): void {
   this.destroy$.next();
   this.destroy$.complete();
 }
}

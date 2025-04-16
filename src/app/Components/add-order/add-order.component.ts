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
@Component({
  selector: 'app-add-order',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css'
})
export class AddOrderComponent implements OnInit, OnDestroy {
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
   shippingTypes!:iShippingtypes[]
   cities!:ICity[]
   gvrnCities!: ICity[]
   oldgvrn:any=""
   oldcity:any=""
   oldbranch:any=""
   merchants!:any
  constructor(private _AdminOrdersService:AdminOrdersService,private _AdminService:AdminService, private _GovernratesService:GovernratesService,private _ShippingService:ShippingService,private _FormBuilder: FormBuilder,private _ActivatedRoute:ActivatedRoute,private _Router:Router,private _AdminBranchesService:AdminBranchesService) {
    this.orderForm = this._FormBuilder.group({
      customerName: ['', [Validators.required,Validators.minLength(3)]],
      customerPhone: ['', [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
      customerEmail: ['',[Validators.required,Validators.email]],
      cityId: ['',Validators.required],
      governorateId: ['',Validators.required],
      merchentId:[[Validators.required]],
      shippingTypeId: ['',Validators.required],
      orderStatus: ['New'],
      isVillageDelivery:false,
      villageStreetAddress: [''],
      orderPrice: ['',Validators.required],
      totalWeight: [],
      branchId:['',Validators.required],
      phonenumber:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],  //for merchant
      address:['',[Validators.required,Validators.minLength(5)]],        //for merchant
      paymentMethod: ['',Validators.required],
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
      name: ['', Validators.required],
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
    if (this.orderForm.valid ) {
      this.loading=true
      const orderData = this.orderForm.value;
      console.log('Submitting Order:', orderData);
      this._AdminOrdersService.addOrder(orderData).pipe(takeUntil(this.destroy$)).subscribe({
        next: response => {
          console.log('Order submitted!', response)
          this.loading=false
          if(response.statusCode==200){
            setTimeout(() => {
               this._Router.navigate(['/orders','New'])
            }, 1000);
             
          }
        },
        error: (error )=> {
        this.formErrorMsg=error
        this.loading=false
        },
      });
    } else {
      console.log('Form is invalid',this.orderForm.value);
      this.orderForm.markAllAsTouched()
    }
  }
  else{
    if (this.orderForm.valid ) {
      this.loading=true
      const orderData = this.orderForm.value;
      console.log('Submitting Order:', orderData);
      this._AdminOrdersService.editOrders(orderData).pipe(takeUntil(this.destroy$)).subscribe({
        next: response => {
          console.log('Order submitted!', response)
          this.loading=false
          if(response.statusCode==200){
            setTimeout(() => {
               this._Router.navigate(['/orders','New'])
            }, 1000);
             
          }
        },
        error: (error :HttpErrorResponse)=> {
        this.formErrorMsg=error.message
        this.loading=false
        },
      });
    } else {
      console.log('Form is invalid',this.orderForm.value);
      this.orderForm.markAllAsTouched()
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
          this.paymentMethod.setValue(res.paymentMethod)
          this.shippingMethod.setValue(res.shippingMethod)
          this.governorateId.setValue(res.governorateId)
          this.shippingTypeId.setValue(res.shippingTypeId)
          this.totalWeight.setValue(res.totalWeight)
          this.merchantphonenumber.setValue(res.phonenumber)
          this.merchantAddress.setValue(res.address)
          this.price.setValue(res.orderPrice)
          this.branchId.setValue(res.branchId)
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
  get paymentMethod(){
    return this.orderForm.controls['paymentMethod']
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
   get merchentId(){
     return this.orderForm.controls['merchentId']
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

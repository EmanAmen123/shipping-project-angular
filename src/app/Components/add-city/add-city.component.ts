import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GovernratesService } from '../../core/services/governrates/governrates.service';
import { IGovernrate } from '../../core/interfaces/igeneral';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-city',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.css'
})
export class AddCityComponent implements OnInit {
  private destroy$ = new Subject<void>();
  governrates!: IGovernrate[]
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)
  private readonly _cityService=inject(GovernratesService)
  
  cityForm:FormGroup=this._FormBuilder.group({
    name:['',[Validators.required,Validators.minLength(3)]],
    shippingPrice:['',[Validators.required]],
    pickUpShippingPrice:['',[Validators.required]],
    isDeleted:[false],
    govId:['',[Validators.required]]
  })
  ngOnInit(): void {
    this._cityService.getAllGovernrates().pipe(takeUntil(this.destroy$)).subscribe({
      next:(res)=>{
        this.governrates=res
         console.log(res)
         console.log(this.governrates)
      },
      error:(err)=>{
        console.log(err)
      },
     
     })
  }

  handleSubmit(){
     if(this.cityForm.valid){
      const cityForm=this.cityForm.value
      console.log(cityForm)
      this._cityService.addCity(cityForm).pipe(takeUntil(this.destroy$)).subscribe({
          next:(res)=>{
              console.log('res',res)
              // if(res.statusCode==200){
              //     // navigate
              //     // this._Router.navigate(['/home'])
              // }
          },
          error:(err)=>{
              console.log('error',err)
          }
      })
     }else{
       console.log('not vlid' , this.cityForm.errors)
     }
  }
   get govId(){
    return this.cityForm.controls['govId']
   }
   get name(){
    return this.cityForm.controls['name']
   }
   get shippingPrice(){
    return this.cityForm.controls['shippingPrice']
   }
   get pickUpShippingPrice(){
    return this.cityForm.controls['pickUpShippingPrice']
   }
 
  
  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}

import { Component, inject } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from '../../../core/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    
  private destroy$ = new Subject<void>();

    
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _LoginService=inject(LoginService)
  private readonly _Router=inject(Router)
  
  loginForm:FormGroup=this._FormBuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
  })
  
  handleSubmit(){
  
     if(this.loginForm.valid){
      const formValue=this.loginForm.value
      console.log(formValue)
      this._LoginService.login(formValue).pipe(takeUntil(this.destroy$)).subscribe({
          next:(res)=>{
              console.log('log in resp',res)
              if(res.statusCode===200){
                  // save token
                  localStorage.setItem('token',res.data.token)
                  // decode token
                 this._LoginService.saveUserData()

                  // navigate
                  this._Router.navigate(['/home'])
              }
          },
          error:(err)=>{
              console.log('error',err)
          }
      })
     }else{
       console.log('not vlid' , this.loginForm.errors)
     }
  }
  
  
  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}

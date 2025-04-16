import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';
import { routes } from '../../../app.routes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   baseUrl:string
   userToken!:string|null
   userData:any=null
  constructor(private _HttpClient:HttpClient,private _MainService:MainService,private _Router:Router) { 
    this.baseUrl=_MainService.baseUrl
  }
   
  login(account:any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/Account/Login`,account)
  }

  saveUserData(){
    this.userToken=localStorage.getItem('token')
    if(this.userToken!==null){
     this.userData= jwtDecode(this.userToken)
     console.log('user data',this.userData)
     return this.userData
    }else{
      console.log('no token')
    }
  }
  logout():void{
    localStorage.removeItem('token')
    this.userData=null
    this._Router.navigate(['/login'])
  }
}

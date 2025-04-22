import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   baseUrl:string
   userToken!:string|null
   userData:any=null
   role!:string
   name!:string
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
     this.role=this.userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
     this.name=this.userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"]
     console.log('role',this.role)
     console.log('user data',this.userData)
     return this.userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    }else{
      console.log('no token')
    }
  }



  getUserRole(){
    return this.userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout():void{
    localStorage.removeItem('token')
    this.userData=null
    this._Router.navigate(['/login'])
  }
}

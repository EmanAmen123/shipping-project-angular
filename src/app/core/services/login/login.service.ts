import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   baseUrl:string
   userToken:string|null=localStorage.getItem('token')
   
  constructor(private _HttpClient:HttpClient,private _MainService:MainService) { 
    this.baseUrl=_MainService.baseUrl
  }
   
  login(account:any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/Account/Login`,account)
  }

  saveUserData():void{
    if(this.userToken!==null){
      jwtDecode(this.userToken)
    }
  }
}

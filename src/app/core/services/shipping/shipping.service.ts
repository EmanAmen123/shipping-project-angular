import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs';
import { iShippingtypes } from '../../interfaces/igeneral';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  baseurl:string
  constructor(private _httpClient:HttpClient,private _MainService:MainService) { 
  this.baseurl=`${this._MainService.baseUrl}/api/ShippingType`

  }
   
  getAllShippingTypes():Observable<iShippingtypes[]>
  {
    return this._httpClient.get<iShippingtypes[]>(`${this.baseurl}`)
  }
  addShippingType(shipping:any):Observable<any>{
    return this._httpClient.post(`${this.baseurl}`,shipping)
  } 
  editShippingType(shipping:any):Observable<any>
  {
    return this._httpClient.put(`${this.baseurl}`,shipping)
  }
  deleteShippingType(shipping:any):Observable<any>
  {
    return this._httpClient.put(`${this.baseurl}`,shipping)
  }


}

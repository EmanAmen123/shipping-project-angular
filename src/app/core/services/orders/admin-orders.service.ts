import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from '../main/main.service';
import { IOrder,IOrderById } from '../../interfaces/igeneral';
@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {
  baseurl:string
  constructor(private _httpClient:HttpClient,private _MainService:MainService) { 
  this.baseurl=`${this._MainService.baseUrl}/api/Order`

  }
   
  getOrders():Observable<IOrder[]>
  {
    return this._httpClient.get<IOrder[]>(`${this.baseurl}`)
  }
  getSpecificOrders(searchWord:string):Observable<any>
  {
    return this._httpClient.get(`${this.baseurl}/${searchWord}`)
  }
  editOrders(order:any):Observable<any>
  {
    return this._httpClient.put(`${this.baseurl}/product-Edit`,order)
  }

  getOrderById(orderId:string):Observable<IOrderById>{
    return this._httpClient.get<IOrderById>(`${this.baseurl}/${orderId}`)
  }

  addOrder(order:any):Observable<any>{
     return this._httpClient.post(`${this.baseurl}`,order)
  }

  deleteOrder(orderId:number):Observable<any>{
   return this._httpClient.delete(`${this.baseurl}/${orderId}`)
  }
}

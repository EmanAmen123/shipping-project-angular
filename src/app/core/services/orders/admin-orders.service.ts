import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  // getOrdersByStatus(searchWord:string):Observable<any>
  // {
  //   return this._httpClient.get(`${this.baseurl}/${searchWord}`)
  // }
  getOrdersByStatus(status: string, pageNumber: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
  
    return this._httpClient.get<any>(`${this.baseurl}/${status}`, { params });
  }
  editOrders(order:any):Observable<any>
  {
    return this._httpClient.put(`${this.baseurl}/product-Edit`,order)
  }

  getOrderById(orderId:string):Observable<IOrderById>{
    return this._httpClient.get<IOrderById>(`${this.baseurl}/${orderId}`)
  }

  addOrder(order:any):Observable<any>{
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
     return this._httpClient.post(`${this.baseurl}`,order,{ headers })
  }

  deleteOrder(orderId:number):Observable<any>{
   return this._httpClient.delete(`${this.baseurl}/${orderId}`)
  }
}

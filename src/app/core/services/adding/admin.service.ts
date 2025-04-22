import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from '../main/main.service';
import { IEmployee } from '../../interfaces/igeneral';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseurl:string
  constructor(private _HttpClient:HttpClient,private _MainService:MainService) {
    this.baseurl=_MainService.baseUrl
   }
  addDeliveryRepresentative(person:any):Observable<any>{
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this._HttpClient.post(`${this.baseurl}/api/Delivery`,person,{headers})
  }
  getDeliveryRepresentative():Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/Delivery`)
  }
  addEmployee(employee:IEmployee):Observable<any>{
    return this._HttpClient.post(`${this.baseurl}/api/Employee`,employee)
  }
  getAllEmployees():Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/Employee`)
  }
  getEmployeeById(id:number):Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/Employee/${id}`)
  }
  deleteEmployee(id:number):Observable<any>{
    return this._HttpClient.delete(`${this.baseurl}/api/Employee/${id}`)
  }

  getAllRepports():Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/OrderReport`)
  }
  getAllRepportsPaginated(pageNumber: number, pageSize: number):Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/OrderReport`)
  }
  getRepportsByStatus(status:string):Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/OrderReport/${status}`)
  }
  getRepportsByStatusPaginated(status: string, pageNumber: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
  
    return this._HttpClient.get(`${this.baseurl}/api/OrderReport/${status}`, { params });
  }
  
  getRepportsByDate(fromDate:Date,toDate:Date):Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/OrderReport/${fromDate}/${toDate}`)
  }



  getCounts():Observable<any>{
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this._HttpClient.get(`${this.baseurl}/api/DashBoard/order-status-counts`,{headers})
  }


  addWeightSetting(setting:any):Observable<any>{
    return this._HttpClient.post(`${this.baseurl}/api/Weight`,setting)
  }

  getAllMerchants(){
    return this._HttpClient.get(`${this.baseurl}/api/Merchant`)
  }
  addmerchant(merchant:any){
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
   return this._HttpClient.post(`${this.baseurl}/api/Merchant`,merchant,{headers})
  }
   

  changeOrderStatus(orderId: number, status: string): Observable<any> {
    const token = localStorage.getItem('token'); 
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams()
    .set('orderId', orderId)
    .set('status', status);
    return this._HttpClient.put(`${this.baseurl}/api/DeliveryEmployee/update-status`,null, { headers, params });
  }
  assignOrder(deliveryId: number, orderId: number): Observable<any> {
    const token = localStorage.getItem('token'); 
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams()
    .set('deliveryId', deliveryId)
    .set('orderId', orderId);
    return this._HttpClient.put(`${this.baseurl}/api/DeliveryEmployee/assign-delivery`,null, { headers, params });
  }


  getGovDelivery(gov:string){

    return this._HttpClient.get(`${this.baseurl}/api/Delivery/${gov}`)
  }
}

 
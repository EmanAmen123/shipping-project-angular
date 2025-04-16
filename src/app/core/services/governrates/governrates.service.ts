import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs';
import { IGovernrate,ICity } from '../../interfaces/igeneral';
@Injectable({
  providedIn: 'root'
})
export class GovernratesService {
  baseurl:string
  constructor(private _httpClient:HttpClient,private _MainService:MainService) { 
  this.baseurl=`${this._MainService.baseUrl}/api/Governorate`

  }
   
  getAllGovernrates():Observable<IGovernrate[]>
  {
    return this._httpClient.get<IGovernrate[]>("https://localhost:7118/api/Governorate")
  }
  addGovernrate(gvrn:any):Observable<any>{
    return this._httpClient.post(`${this.baseurl}`,gvrn)
  } 
  editGovernrate(gvrn:any,gvrnId:number):Observable<any>
  {
    return this._httpClient.put(`${this.baseurl}/${gvrnId}`,gvrn)
  }
  
  getAllCities():Observable<ICity[]>
  {
    return this._httpClient.get<ICity[]>("https://localhost:7118/api/city")
  }
  getCitiesById(gvrnId:number):Observable<ICity[]>
  {
    return this._httpClient.get<ICity[]>(`https://localhost:7118/api/city/${gvrnId}`)
  }
  addCity(city:ICity):Observable<any>{
    return this._httpClient.post('https://localhost:7118/api/city',city)

  }
}

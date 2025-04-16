import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  baseUrl:string="https://localhost:7118"
  constructor(private _httpClient:HttpClient) { }
  
}

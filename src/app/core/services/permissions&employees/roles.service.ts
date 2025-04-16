import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllRoles():Observable<any>{
    return this._HttpClient.get('https://localhost:7118/api/Role')
  }
}

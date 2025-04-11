import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ibranch } from '../../interfaces/igeneral';

@Injectable({
  providedIn: 'root'
})
export class AdminBranchesService {

  constructor(private _httpClient:HttpClient) { }

  getBranches():Observable<Ibranch[]>
  {
    return this._httpClient.get<Ibranch[]>("https://localhost:7118/api/Branch")
  }
  deleteBranch(branchId:number):Observable<any>
  {
    const params = new HttpParams().set('id', branchId);
    return this._httpClient.delete("https://localhost:7118/api/Branch",{params})
  }
}

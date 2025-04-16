import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../core/services/adding/admin.service';
import { IEmployee } from '../../core/interfaces/igeneral';

@Component({
  selector: 'app-employees',
  imports: [RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit,OnDestroy {
  private destroy$ = new Subject<void>();
  employees:{name:string,branch:string,email:string,id:number,userRole:string,phoneNumber:string}[]=[]
  private readonly _Router=inject(Router)
  private readonly _AdminService=inject(AdminService)


  ngOnInit(): void {
    this._AdminService.getAllEmployees().pipe(takeUntil(this.destroy$)).subscribe({
      next:(res)=>{
         console.log('employees',res)
         this.employees=res
      }
    })
  }
  
  
  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}

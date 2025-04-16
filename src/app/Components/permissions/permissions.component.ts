import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RolesService } from '../../core/services/permissions&employees/roles.service';

@Component({
  selector: 'app-permissions',
  imports: [],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css'
})
export class PermissionsComponent implements OnInit,OnDestroy {
  private destroy$ = new Subject<void>();
  permissions:{createdDate:Date,id:string,name:string}[]=[]
  private readonly _Router=inject(Router)
  private readonly _RolesService=inject(RolesService)


  ngOnInit(): void {
    this._RolesService.getAllRoles().pipe(takeUntil (this.destroy$)).subscribe({
      next:(res)=>{
         console.log('roles',res)
         this.permissions=res
      }
    })
  }
  
  
  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}

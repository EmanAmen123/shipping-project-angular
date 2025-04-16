import { Component, OnInit } from '@angular/core';
import { GovernratesService } from '../../core/services/governrates/governrates.service';
import { Subject, takeUntil } from 'rxjs';
import { IGovernrate } from '../../core/interfaces/igeneral';

@Component({
  selector: 'app-governrates',
  imports: [],
  templateUrl: './governrates.component.html',
  styleUrl: './governrates.component.css'
})
export class GovernratesComponent implements OnInit {
    private destroy$ = new Subject<void>();
    gvrns:IGovernrate[]=[]
  constructor(private _GovernratesService:GovernratesService){}
   ngOnInit(): void {
      this.getGovernrates()
   }
    getGovernrates(){
       this._GovernratesService.getAllGovernrates().pipe(takeUntil(this.destroy$)).subscribe({
        next:(res)=>{
          this.gvrns=res
           console.log('gv',res)
        },
        error:(err)=>{
          console.log(err)
        },
       
       })
      }
      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete(); 
     }
}

import { Component, OnInit } from '@angular/core';
import { GovernratesService } from '../../core/services/governrates/governrates.service';
import { Subject, takeUntil } from 'rxjs';
import { IGovernrate } from '../../core/interfaces/igeneral';
import { EditGovrnModalComponent } from '../edit-govrn-modal/edit-govrn-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-governrates',
  imports: [],
  templateUrl: './governrates.component.html',
  styleUrl: './governrates.component.css'
})
export class GovernratesComponent implements OnInit {
    private destroy$ = new Subject<void>();
    gvrns:IGovernrate[]=[]
  constructor(private _GovernratesService:GovernratesService,  private dialog: MatDialog){}
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
       settingActive(govid:number){
               console.log(govid)
               this.dialog.open(EditGovrnModalComponent, {
                 width: '600px',
                 height:'300px',
                 
                 data: {govid } 
               });
              }
         
            openModal() {
             const dialogRef = this.dialog.open(EditGovrnModalComponent, {
               width: '400px',
               data: { } 
             });
           
             dialogRef.afterClosed().subscribe(result => {
               if (result) {
                 console.log('Modal result:', result);
               }
             });
           }
      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete(); 
     }
}

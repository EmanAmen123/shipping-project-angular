import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminBranchesService } from '../../core/services/branches/admin-branches.service';
import { Ibranch } from '../../core/interfaces/igeneral';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-branches',
  imports: [],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})
export class BranchesComponent implements OnInit,OnDestroy{
  allBranches!:Ibranch[]
  
  subscription:Subscription[]=[]
  
   constructor(private _AdminBranchesService:AdminBranchesService){}
   ngOnInit(): void {
    this.getAllBranches()
   }

   getAllBranches(){
    const branchessubscription= this._AdminBranchesService.getBranches().subscribe({
      next:(res)=>{
          this.allBranches=res
          console.log('branches',this.allBranches.filter((br)=>{
            return br.isDeleted==false
          }))
          
      },
      error:(err)=>{
        console.log(err)
      }
     })
     this.subscription.push(branchessubscription)
   }
   deleteBranch(branchId:number){
   const deletebranchsubscription= this._AdminBranchesService.deleteBranch(branchId).subscribe({
     next:(res)=>{
        this.allBranches=this.allBranches.filter((branch:Ibranch)=>{
          return branch.id!=branchId
        })
        console.log('deleted',res)
     },
     error:(err)=>{
      console.log(err)
     }
    })
    this.subscription.push(deletebranchsubscription)
   }

   ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe())
   }
}

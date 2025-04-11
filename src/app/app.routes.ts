import { Routes } from '@angular/router';
import { AdminHomeComponent } from './Components/admin-home/admin-home.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { ShowOrdersComponent } from './Components/show-orders/show-orders.component';
import { AddOrderComponent } from './Components/add-order/add-order.component';
import { BranchesComponent } from './Components/branches/branches.component';
import { AdminLayoutComponent } from './LayOuts/admin-layout/admin-layout.component';
import { MerchantLayoutComponent } from './LayOuts/merchant-layout/merchant-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoginComponent } from './Components/login/login/login.component';

export const routes: Routes = [
    // {path:'',component:AdminLayoutComponent,children:[  
    //     {path:'',redirectTo:'home',pathMatch:'full'}  ,
    //     {path:'home',component:AdminHomeComponent},
    //     {path:'branches',component:BranchesComponent}
    // ]},
    // {path:'',component:MerchantLayoutComponent,children:[
    //     {path:'',component:}
    // ]},
    // {path:'**',component:NotFoundComponent},

    {path:'',redirectTo:'home',pathMatch:'full',title:"home"},
    {path:'home',component:AdminHomeComponent,title:'home'},
    {path:'emo',component:EmployeesComponent,title:'employees'},
    {path:'orders',component:ShowOrdersComponent, title:'orders'},
    {path:'orders/:status',component:ShowOrdersComponent, title:'orders'},
    {path:'addOrder/:orderId',component:AddOrderComponent,title:'add order'},
    {path:'branches',component:BranchesComponent,title:'branches'},
    {path:'log',component:LoginComponent}
];


import { MerchantOrderComponent } from './Components/merchant-order/merchant-order.component';
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
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { AddingRepresentativeComponent } from './Components/adding-representative/adding-representative.component';
import { AllDeliveryrepresentativesComponent } from './Components/all-deliveryrepresentatives/all-deliveryrepresentatives.component';
import { GovernratesComponent } from './Components/governrates/governrates.component';
import { AddCityComponent } from './Components/add-city/add-city.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { AddMerchantComponent } from './Components/add-merchant/add-merchant.component';
import { WeightsettingsModalComponent } from './Components/weightsettings-modal/weightsettings-modal.component';
import { DeliveryLayoutComponent } from './LayOuts/delivery-layout/delivery-layout.component';
import { roleGuard } from './core/guards/role.guard';
import { RolesService } from './core/services/permissions&employees/roles.service';
import { DeliveryOrdersComponent } from './Components/delivery-orders/delivery-orders.component';

export const routes: Routes = [
    // {path:'',component:AdminLayoutComponent,children:[  
    //     {path:'',redirectTo:'home',pathMatch:'full'}  ,
    //     {path:'home',component:AdminHomeComponent},
    //     {path:'employees',component:EmployeesComponent,title:'employees'},
    //     {path:'orders',component:ShowOrdersComponent, title:'orders',canActivate:[authGuardGuard]},
    //     {path:'orders/:status',component:ShowOrdersComponent, title:'orders',canActivate:[authGuardGuard]},
    //     {path:'addOrder/:orderId',component:AddOrderComponent,title:'add order',canActivate:[authGuardGuard]},
    //     {path:'branches',component:BranchesComponent,title:'branches',canActivate:[authGuardGuard]},
    //     {path:'addDelivery',component:AddingRepresentativeComponent},
    //     {path:'delivery',component:AllDeliveryrepresentativesComponent},
    //     {path:'governrates',component:GovernratesComponent},
    //     {path:'addCity',component:AddCityComponent},
    //     {path:'permissions',component:Permissions},
    //     {path:'addEmployee/:id',component:AddEmployeeComponent},
    //     {path:'reports',component:ReportsComponent},
    //     {path:'weightSettings',component:WeightsettingsModalComponent},
    //     {path:'addmerch',component:AddMerchantComponent}
    // ]},
    // {path:'',component:MerchantLayoutComponent,children:[
    //     {path:'',redirectTo:'home',pathMatch:'full'}  ,
    //     {path:'home',component:AdminHomeComponent},
    //     {path:'addorder/:orderId',component:MerchantOrderComponent},
    //     {path:'reports',component:ReportsComponent}
    // ]},
    // {path:'',component:DeliveryLayoutComponent},
    // // {path:'**',component:NotFoundComponent},

    // {path:'',redirectTo:'home',pathMatch:'full',title:"home"},
    // {path:'home',component:AdminHomeComponent,title:'home',canActivate:[authGuardGuard]},
    // {path:'employees',component:EmployeesComponent,title:'employees'},
    // {path:'orders',component:ShowOrdersComponent, title:'orders',canActivate:[authGuardGuard]},
    // {path:'orders/:status',component:ShowOrdersComponent, title:'orders',canActivate:[authGuardGuard]},
    // {path:'addOrder/:orderId',component:AddOrderComponent,title:'add order',canActivate:[authGuardGuard]},
    // {path:'branches',component:BranchesComponent,title:'branches',canActivate:[authGuardGuard]},
    // {path:'login',component:LoginComponent,title:'login'},
    // {path:'addDelivery',component:AddingRepresentativeComponent},
    // {path:'delivery',component:AllDeliveryrepresentativesComponent},
    // {path:'governrates',component:GovernratesComponent},
    // {path:'addCity',component:AddCityComponent},
    // {path:'permissions',component:Permissions},
    // {path:'addEmployee/:id',component:AddEmployeeComponent},
    // {path:'reports',component:ReportsComponent},
    // {path:'weightSettings',component:WeightsettingsModalComponent},
    // {path:'addnerch',component:AddMerchantComponent}
    { path: 'login', component: LoginComponent, title: 'login' },

    {
      path: 'admin',
      component: AdminLayoutComponent,
      canActivate: [authGuardGuard, roleGuard],
      data: { role: 'Admin' },
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: AdminHomeComponent },
        { path: 'employees', component: EmployeesComponent },
        { path: 'orders', component: ShowOrdersComponent },
        { path: 'orders/:status', component: ShowOrdersComponent },
        { path: 'addOrder/:orderId', component: AddOrderComponent },
        { path: 'branches', component: BranchesComponent },
        { path: 'addDelivery', component: AddingRepresentativeComponent },
        { path: 'delivery', component: AllDeliveryrepresentativesComponent },
        { path: 'governrates', component: GovernratesComponent },
        { path: 'addCity', component: AddCityComponent },
        { path: 'permissions', component: Permissions },
        { path: 'addEmployee/:id', component: AddEmployeeComponent },
        { path: 'reports', component: ReportsComponent },
        { path: 'weightSettings', component: WeightsettingsModalComponent },
        { path: 'addmerch', component: AddMerchantComponent }
      ]
    },
    
    {
      path: 'merchant',
      component: MerchantLayoutComponent,
      canActivate: [authGuardGuard, roleGuard],
      data: { role: 'Merchant' },
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: AdminHomeComponent },
        { path: 'addorder/:orderId', component: MerchantOrderComponent },
        { path: 'reports', component: ReportsComponent }
      ]
    },
    
    {
      path: 'delivery',
      component: DeliveryLayoutComponent,
      canActivate: [authGuardGuard, roleGuard],
      data: { role: 'Delivery' },
      children: [
        {path:'',redirectTo: 'home', pathMatch: 'full'},
        {path:'home',component:AdminHomeComponent},
        {path:'orders',component:DeliveryOrdersComponent}
      ]
    },
    
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component:NotFoundComponent }
]    

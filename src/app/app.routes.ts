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
import { MerchantordersComponent } from './Components/merchantorders/merchantorders.component';

export const routes: Routes = [
  
    { path: 'login', component: LoginComponent, title: 'login' },

    {
      path: 'Admin',
      component: AdminLayoutComponent,
      canActivate: [authGuardGuard, roleGuard],
      data: { role: 'Admin' },
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: AdminHomeComponent , title:'Home' },
        { path: 'employees', component: EmployeesComponent,title:'Employees' },
        // { path: 'orders', component: ShowOrdersComponent },
        { path: 'orders/:status', component: ShowOrdersComponent,title:'Orders' },
        { path: 'addOrder/:orderId', component: AddOrderComponent , title:'Add Order'},
        { path: 'branches', component: BranchesComponent,title:'Branches' },
        { path: 'addDelivery', component: AddingRepresentativeComponent,title:'Add Representative' },
        { path: 'delivery', component: AllDeliveryrepresentativesComponent , title:'Representatives'},
        { path: 'governrates', component: GovernratesComponent,title:'Governrates' },
        { path: 'addCity', component: AddCityComponent,title:'Add City' },
        { path: 'permissions', component: Permissions },
        { path: 'addEmployee/:id', component: AddEmployeeComponent },
        { path: 'reports', component: ReportsComponent ,title:'Reports'},
        { path: 'weightSettings', component: WeightsettingsModalComponent ,title:'weightSettings'},
        { path: 'addmerch', component: AddMerchantComponent,title:'Add Merchant' }
      ]
    },
    
    {
      path: 'Merchant',
      component: MerchantLayoutComponent,
      canActivate: [authGuardGuard, roleGuard],
      data: { role: 'Merchant' },
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: AdminHomeComponent,title:'Home' },
        { path: 'orders/:status', component: MerchantordersComponent,title:'Orders' },
        { path: 'addorder/:orderId', component: MerchantOrderComponent },
        { path: 'reports', component: ReportsComponent,title:'Reports' }
      ]
    },
    
    {
      path: 'Delivery',
      component: DeliveryLayoutComponent,
      canActivate: [authGuardGuard, roleGuard],
      data: { role: 'Delivery' },
      children: [
        {path:'',redirectTo: 'home', pathMatch: 'full'},
        {path:'home',component:AdminHomeComponent,title:'Home'},
        {path:'orders',component:DeliveryOrdersComponent,title:'Orders'},
        {path:'reports',component:ReportsComponent,title:'Orders'}
      ]
    },
    
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component:NotFoundComponent }


]    

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PermissionsComponent } from "./Components/permissions/permissions.component";
import { AddingPermissionComponent } from "./Components/adding-permission/adding-permission.component";
import { EmployeesComponent } from "./Components/employees/employees.component";
import { AddingMerchantComponent } from "./Components/adding-merchant/adding-merchant.component";
import { AddingRepresentativeComponent } from "./Components/adding-representative/adding-representative.component";
import { BranchesComponent } from "./Components/branches/branches.component";
import { GovernratesComponent } from "./Components/governrates/governrates.component";
import { ShowOrdersComponent } from "./Components/show-orders/show-orders.component";
import { AdminSidebarComponent } from "./Components/admin-sidebar/admin-sidebar.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PermissionsComponent, AddingPermissionComponent, EmployeesComponent, AddingMerchantComponent, AddingRepresentativeComponent, BranchesComponent, GovernratesComponent, ShowOrdersComponent, AdminSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shipping';
}

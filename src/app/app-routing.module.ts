import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { PaymentsComponent } from './payments/payments.component';
import { PoliciesComponent } from './policies/policies.component';
import { CustomerDetailsComponent } from './customers/details/details.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CustomerDetailsDummy } from './customers/details/details.dummy';
import { CustomerAddDummy } from './customers/add/add.dummy';
import { PolicyDetailsDummy } from './policies/details/details.dummy';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'customers',
    component: CustomersComponent,
    children: [
      {path: 'details/:id', component: CustomerDetailsDummy},
      {path: 'add', component: CustomerAddDummy}
    ]
  },
  {
    path: 'policies',
    component: PoliciesComponent,
    children: [
      {path: 'details/:id', component: PolicyDetailsDummy}
    ]
  },
  {
    path: 'payments',
    component: PaymentsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

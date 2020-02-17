import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import {  MatInputModule,
          MatPaginatorModule,
          MatSortModule,
          MatProgressSpinnerModule,
          MatButtonModule,
          MatRadioModule,
          MatOptionModule,
          MatSelectModule,
          MatDialogModule,
          MatDialogRef,
          MatCardModule,
          MatSidenavModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SingleStatComponent } from './dashboard/single-stat/single-stat.component';
import { TableGenericComponent } from './table-generic/table-generic.component';

import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailsComponent } from './customers/details/details.component';
import { CustomerDetailsDummy } from './customers/details/details.dummy';

import { PoliciesComponent } from './policies/policies.component';
import { PolicyDetailsComponent } from './policies/details/details.component';
import { PolicyDetailsDummy } from './policies/details/details.dummy';

import { PaymentsComponent } from './payments/payments.component';

import { SidenavComponent } from './sidenav/sidenav.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SingleStatComponent,
    TableGenericComponent,
    CustomersComponent,
    CustomerDetailsComponent,
    CustomerDetailsDummy,
    PoliciesComponent,
    PolicyDetailsComponent,
    PolicyDetailsDummy,
    PaymentsComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatSidenavModule,
    NgbModule
  ],
  entryComponents: [CustomerDetailsComponent, PolicyDetailsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

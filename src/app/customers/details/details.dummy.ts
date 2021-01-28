import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerDetailsComponent } from './details.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ICustomer, ICustomerPage } from '../../../../../QpayAPI/app/interfaces/customer.interface';
import { CustomersDataSource } from '../customers.datasource';

@Component({
    template: ''
  })
  export class CustomerDetailsDummy {

    customerData: ICustomer;

    constructor(public dialog: MatDialog,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location) {
      this.openDialog();
    }
    openDialog(): void {
        const id = this.route.snapshot.paramMap.get('id');
        const dialogRef = this.dialog.open(CustomerDetailsComponent, {
            width: '70vw',
            data: id
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result) this.customerData = result;
            this.router.navigate(['/customers'], { relativeTo: this.route });
        });
    }
}

import { Component, OnInit, Inject } from '@angular/core';
import { ICustomer, ICustomerPage } from '../../../../../QpayAPI/app/interfaces/customer.interface';
import { IPolicy, IPolicyPage } from '../../../../../QpayAPI/app/interfaces/policy.interface';
import { IContact, IContactPage } from '../../../../../QpayAPI/app/interfaces/contact.interface';
import { CustomersService } from '../customers.service';
import { PoliciesService } from '../../policies/policies.service';
import { ContactsService } from '../../contacts.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class CustomerAddComponent implements OnInit {
  customerData$: Observable<ICustomer>;
  customerPolicies$: Observable<IPolicyPage>;
  customerContacts$: Observable<IContactPage>;

  customerData;

  constructor(
    private route: ActivatedRoute,
    private customersService: CustomersService,
    private policiesService: PoliciesService,
    private contactsService: ContactsService,
    public dialogRef: MatDialogRef<CustomerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    //const id = this.data;
    //this.customerData$ = this.getCustomerData(id);
    //this.customerPolicies$ = this.getCustomerPolicies(id);
    //this.customerContacts$ = this.getCustomerContacts(id);
    this.customerData = {};
    // this.customerPolicies$.subscribe(res => { console.log(res.results) });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCustomerData(id) {
    console.log('getting details of ' + id);
    const customers = this.customersService.getCustomerDetails(id).subscribe( data => { console.log(data); });
    return this.customersService.getCustomerDetails(id);
  }

  updateCustomer(customerData): void {
    console.log(this.customerData$);
    this.customersService.updateCustomer(customerData).subscribe( data => { console.log(data); });
  }

  addCustomer(customerData): void {
    console.log(customerData);
    this.customersService.addCustomer(customerData).subscribe( data => { console.log(data); });
  }

  getCustomerPolicies(id) {
    console.log('getting policies of ' + id);
    return this.policiesService.getCustomerPolicies(id);
  }

  getCustomerContacts(id) {
    console.log('getting contacts of ' + id);
    return this.contactsService.getCustomerContacts(id);
  }

}

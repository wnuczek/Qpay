import { Component, OnInit, Inject } from '@angular/core';
import { ICustomer, ICustomerPage } from '../../../../../QpayAPI/app/interfaces/customer.interface';
import { IPolicy, IPolicyPage } from '../../../../../QpayAPI/app/interfaces/policy.interface';
import { IContact, IContactPage } from '../../../../../QpayAPI/app/interfaces/contact.interface';
import { CustomersService } from '../../customers/customers.service';
import { PoliciesService } from '../policies.service';
import { ContactsService } from '../../contacts.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class PolicyDetailsComponent implements OnInit {
  policyData$: Observable<IPolicy>;
  customerPolicies$: Observable<IPolicyPage>;
  customerDetails$: Observable<ICustomer>;
  customerId;

  constructor(
    private route: ActivatedRoute,
    private customersService: CustomersService,
    private policiesService: PoliciesService,
    private contactsService: ContactsService,
    public dialogRef: MatDialogRef<PolicyDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    const id = this.data;
    this.policyData$ = this.getPolicyData(id);

    let customerId2 = this.policyData$.subscribe(res => {this.customerId = res['results'][0].customerId; console.log(this.customerId); this.customerPolicies$ = this.getCustomerPolicies(this.customerId);
    this.customerDetails$ = this.getPolicyOwner(this.customerId);});
    
    // this.customerPolicies$.subscribe(res => { console.log(res.results) });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getPolicyData(id) {
    console.log('getting details of ' + id);
    const customers = this.policiesService.getPolicyDetails(id).subscribe( data => { console.log(data); });
    return this.policiesService.getPolicyDetails(id);
  }

  updatePolicy(policyData): void {
    console.log(this.policyData$);
    this.customersService.updateCustomer(policyData).subscribe( data => { console.log(data); });
  }

  getPolicyOwner(customerId) {
    console.log('getting owner of ' + customerId);
    return this.customersService.getCustomerDetails(customerId);
  }

  getCustomerPolicies(customerId) {
    console.log('getting other policies of ' + customerId);
    return this.policiesService.getCustomerPolicies(customerId);
  }

}

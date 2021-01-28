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
import { NotificationService } from '../../notification.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class CustomerAddComponent implements OnInit {
  customerData$: Observable<ICustomer>;
  addCustomerForm: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private customersService: CustomersService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CustomerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    this.addCustomerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      shortName: [''],
      addressstreet: [''],
      addressbuildingNo: [''],
      addressapartmentNo: [''],
      addresspostCode: [''],
      addresscity: [''],
      nip: ['', Validators.required],
      regon: [''],
      employees: ['']
  });
  }

  // convenience getter for easy access to form fields
  //get f() { return this.addCustomerForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.addCustomerForm.invalid) {
        this.notificationService.notification$.next('Formularz zawiera błędy');
        return;
      }
      this.addCustomer(this.addCustomerForm.value);
  }

  onNoClick(): void {
    this.notificationService.notification$.next('Anulowano dodawanie klienta');
    this.dialogRef.close();
  }

  addCustomer(customerData): void {
    this.customersService.addCustomer(customerData).subscribe(res => {
      console.log(res);
      let addedId = res['Result'].id;
      this.notificationService.notification$.next('Dodano klienta');
      console.log(addedId);
      this.dialogRef.close(addedId);
    });

  }


}

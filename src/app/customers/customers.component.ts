import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../customers.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, startWith, tap, delay, map } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { CustomersDataSource } from '../customers.datasource';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.sass']
})
export class CustomersComponent implements OnInit, AfterViewInit {

  openSidebar = false;

  dataSource: CustomersDataSource;

  displayedColumnsForm = new FormControl();
  displayedColumns: string[] = ['id', 'fullName', 'addresscity', 'nip', 'employees', 'policyCount', 'policyFee'];
  columns = { id: 'L.p.',
              fullName: 'Nazwa',
              shortName: 'Krótka nazwa',
              address: 'Adres',
              addresscity: 'Miasto',
              addresspostCode: 'Kod pocztowy',
              nip: 'NIP',
              regon: 'REGON',
              contactname: 'Os. kontaktowa',
              contactemail: 'Email',
              contactphone: 'Telefon',
              contactposition: 'Stanowisko',
              employees: 'Liczba pracowników',
              policyCount: 'Liczba polis',
              policyFee: 'Suma składek polis'
            };
  columnOrder = { id: 0,
                  fullName: 1,
                  shortName: 2,
                  address: 3,
                  addresscity: 4,
                  addresspostCode: 5,
                  nip: 6,
                  regon: 7,
                  contactname: 8,
                  contactemail: 9,
                  contactphone: 10,
                  contactposition: 11,
                  employees: 12,
                  policyCount: 13,
                  policyFee: 14
                };

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private customersService: CustomersService) {

    this.displayedColumnsForm.valueChanges.pipe().subscribe(array => {
      //console.log(array);
      array.sort((p1, p2) => {
        //console.log('sorting');
        return this.columnOrder[p1] - this.columnOrder[p2];
      });
      //console.log(array);
    });
  }

  ngOnInit() {
    this.dataSource = new CustomersDataSource(this.customersService);
    this.dataSource.loadCustomers('', 1, 10, 'id');
    this.displayedColumnsForm.setValue(['id', 'fullName', 'addresscity', 'nip']);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
            debounceTime(150),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadCustomersPage();
            })
        )
        .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadCustomersPage())
    )
    .subscribe();

  }

  loadCustomersPage() {
    let sortDir = '';
    console.log(this.dataSource);
    if (this.sort.direction === 'desc') { sortDir = '-'; } else { sortDir = ''; }
    this.dataSource.loadCustomers(
        this.input.nativeElement.value,
        this.paginator.pageIndex + 1,
        this.paginator.pageSize,
        this.sort.active + ' ' + this.sort.direction
        );
  }

  updateCustomer(data): void {
    console.log(data);
    this.customersService.updateCustomer(data).subscribe(data => {console.log(data)});
  }
}

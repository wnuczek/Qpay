import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoliciesService } from './policies.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, startWith, tap, delay, map } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { PoliciesDataSource } from './policies.datasource';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ModalComponent } from '../details/modal.component';

@Component({
  selector: 'app-table-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.sass']
})
export class PoliciesComponent implements OnInit, AfterViewInit {

  dataSource: PoliciesDataSource;

  displayedColumnsForm = new FormControl();
  displayedColumns: string[] = ['id', 'policyType', 'number', 'insurer'];
  columns = { id: 'L.p.',
              policyType: 'Rodzaj polisy',
              number: 'Numer polisy',
              customerId: 'ID klienta',
              insurer: 'TU',
              itemsInsured: 'Ubezpieczone',
              dateIssued: 'Data wystawienia',
              insuredFrom: 'Trwa od',
              insuredUntil: 'Trwa do',
              feeParts: 'Ilość rat',
              feeAmount: 'Rata',
              feeTotal: 'Składka',
              brokerage: 'Kurtaz',
              status: 'Status',
              history: 'Wznowienie',
              keeperId: 'ID opiekuna'
            };
  columnOrder = { id: 0,
                policyType: 1,
                number: 2,
                customerId: 3,
                insurer: 4,
                itemsInsured: 5,
                dateIssued: 6,
                insuredFrom: 7,
                insuredUntil: 8,
                feeParts: 9,
                feeAmount: 10,
                feeTotal: 11,
                brokerage: 12,
                status: 13,
                history: 14,
                keeperId: 15
                };

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('customerFilter') customerFilter: ElementRef;

  @ViewChild('customerFilter2') customerFilter2: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private policiesService: PoliciesService,
    public dialog: MatDialog) {

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
    this.dataSource = new PoliciesDataSource(this.policiesService);
    this.dataSource.loadPolicies('', 1, 10, 'id');
    this.displayedColumnsForm.setValue(['id', 'policyType', 'number', 'insurer']);
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.customerFilter.nativeElement, 'keyup')
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
    this.dataSource.loadPolicies(
        this.customerFilter.nativeElement.value,
        this.paginator.pageIndex + 1,
        this.paginator.pageSize,
        sortDir + this.sort.active
        );
  }

  updateCustomer(customerData): void {
    console.log(customerData);
    this.policiesService.updatePolicy(customerData).subscribe(data => { console.log(data); });
  }
}

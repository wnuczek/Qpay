import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../customers.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { CustomersDataSource } from '../customers.datasource';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  dataSource: CustomersDataSource;

  displayedColumns: string[] = ['id', 'fullName', 'addressCity', 'NIP'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(private route: ActivatedRoute, private customersService: CustomersService) { }

  ngOnInit() {
    this.dataSource = new CustomersDataSource(this.customersService);
    this.dataSource.loadCustomers('', 1, 10, 'id');
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
    let sortDir: string = '';
    console.log(this.dataSource);
    if(this.sort.direction == 'desc') { sortDir = '-'; } else { sortDir = ''; }
    this.dataSource.loadCustomers(
        this.input.nativeElement.value,
        this.paginator.pageIndex+1,
        this.paginator.pageSize,
        sortDir+this.sort.active
        );
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }
}

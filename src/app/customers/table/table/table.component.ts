import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomersService } from '../../customers.service';
import { CustomersDataSource } from '../../customers.datasource';

import { debounceTime, distinctUntilChanged, startWith, tap, delay, map } from 'rxjs/operators';
import { merge, fromEvent, Observable } from 'rxjs';
import { defaultDisplayedColumns, defaultColumns } from './table.default.filters';

import { CustomersComponent } from '../../customers.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  dataSource: CustomersDataSource;
  columns = defaultColumns;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() searchTerm: string;
  @Input() displayedColumns: string[];

  @Output() dataSourceLength = new EventEmitter<Observable<number>>();

  constructor(private customersService: CustomersService) { }

  ngOnInit(): void {
    this.dataSource = new CustomersDataSource(this.customersService);
    this.dataSource.loadCustomers('', 1, 10, 'id');
    this.dataSourceLength.emit(this.dataSource.total$);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadCustomersPage())
    )
    .subscribe();

  }

  ngOnChanges(changes: SimpleChanges) {
    const currentTerm: SimpleChange = changes.searchTerm;
    //console.log('prev value: ', currentTerm.previousValue);
    //console.log('got item: ', currentTerm.currentValue);
    if(currentTerm && currentTerm.currentValue) this.loadCustomersPage();
  }

  filterCustomers(event) {
    event.pipe(
            debounceTime(150),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadCustomersPage();
            })
        )
        .subscribe();
  }


  loadCustomersPage() {
    let sortDir = '';
    if (this.sort.direction === 'desc') { sortDir = '-'; } else { sortDir = ''; }
    this.dataSource.loadCustomers(
        this.searchTerm,
        this.paginator.pageIndex + 1,
        this.paginator.pageSize,
        this.sort.active + ' ' + this.sort.direction
        );
  }

  public refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { FormControl } from '@angular/forms';

import { defaultColumnOrder, defaultColumns, defaultDisplayedColumns } from './table/table/table.default.filters';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { TableComponent } from './table/table/table.component';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.sass']
})
export class CustomersComponent implements OnInit, AfterViewInit {
  displayedColumnsForm = new FormControl();
  columnOrder = defaultColumnOrder;
  columns = defaultColumns;
  displayedColumns = defaultDisplayedColumns
  dataSourceTotal;
  @ViewChild('input') input: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(TableComponent) tableComponent: TableComponent;

  searchTerm: string;


  constructor() {

    this.displayedColumnsForm.valueChanges.pipe().subscribe(array => {
      array.sort((p1, p2) => {
        return this.columnOrder[p1] - this.columnOrder[p2];
      });
    });
  }

  ngOnInit() {
    this.displayedColumnsForm.setValue(['id', 'fullName', 'addresscity', 'nip']);
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.searchTerm = this.input.nativeElement.value;
      })
  )
  .subscribe();
  }


  getDataSourceLength(event) {
    event.pipe(
      res => { res.subscribe( val => { this.dataSourceTotal = val})}
    )
  }



  componentAdded(event) {
    //console.log(event.Result);
  }

  componentRemoved(event){
    console.log(event);
    //this.tableComponent.refreshTable();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-generic',
  templateUrl: './table-generic.component.html',
  styleUrls: ['./table-generic.component.sass']
})
export class TableGenericComponent implements OnInit {

  @Input() tableData: Observable<any>;
  @Input() tableColumns;
  @Input() tableTitle;
  @Input() mainRoute;
  displayedColumns = this.tableColumns;
  route = this.mainRoute;
  constructor() { }

  ngOnInit() {
    this.tableData.subscribe(res => console.log(res.results));
    this.displayedColumns = this.tableColumns;
    //this.route=this.mainRoute;
    console.log(this.tableTitle);
    //console.log(this.mainRoute);
    //console.log(this.displayedColumns)
  }

}

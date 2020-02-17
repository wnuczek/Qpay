import { Component, OnInit, Input } from '@angular/core';
import { CustomersService } from '../../customers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-stat',
  templateUrl: './single-stat.component.html',
  styleUrls: ['./single-stat.component.sass']
})
export class SingleStatComponent implements OnInit {
  stat$: Observable<any>;
  @Input() stat;
  @Input() statTitle;

  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    this.stat$ = this.getCustomersSingleStat(this.stat);
  }

  getCustomersSingleStat(stat: string) {
    return this.customersService.getCustomersSingleStat(stat);
  }

}

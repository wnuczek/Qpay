import { Injectable } from '@angular/core';
import { ICustomer, ICustomerPage } from '../../../QpayAPI/app/interfaces/customer.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private apiURL = environment.apiURL;
  constructor(private http: HttpClient) { }

  getCustomers(search?: string, page?: number, perPage?: number, sortBy?: string): Observable<ICustomerPage[]> {
    let requestURL = '?';
    if (search) {requestURL += 'search=' + search + '&'; }
    if (page) {requestURL += 'page=' + page + '&'; }
    if (perPage) {requestURL += 'perPage=' + perPage + '&'; }
    if (sortBy) {requestURL += 'sortBy=' + sortBy; }

    return this.http.get<ICustomerPage[]>(`${this.apiURL}/customers${requestURL}`);
  }
}

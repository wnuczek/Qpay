import { Injectable } from '@angular/core';
import { ICustomer, ICustomerPage } from '../../../../QpayAPI/app/interfaces/customer.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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
    //console.log("Getting " + `${this.apiURL}/customers${requestURL}`);
    return this.http.get<ICustomerPage[]>(`${this.apiURL}/customers${requestURL}`);
  }

  getCustomerDetails(id: string): Observable<ICustomer> {
    return this.http.get<ICustomer>(`${this.apiURL}/customer/${id}`);
  }

  getCustomersSingleStat(stat: string): Observable<any> {
    return this.http.get(`${this.apiURL}/stats/customers/${stat}`);
  }

  addCustomer(customer: ICustomer | number): Observable<any> {
    const url = `${this.apiURL}/customer`;
    return this.http.post(url, customer).pipe(
      tap()
    );
  }

  updateCustomer(customer: ICustomer | number): Observable<any> {
      const id = typeof customer === 'number' ? customer : customer.id;
      //console.log(id);
      const url = `${this.apiURL}/customer/${id}`;
      return this.http.put(url, customer).pipe(
        tap()
      );
  }

}

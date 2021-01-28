import { Injectable } from '@angular/core';
import { IPolicy, IPolicyPage } from '../../../../QpayAPI/app/interfaces/policy.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoliciesService {
  private apiURL = environment.apiURL;
  constructor(private http: HttpClient) { }

  getPolicies(search?: string, page?: number, perPage?: number, sortBy?: string): Observable<IPolicyPage[]> {
    let requestURL = '?';
    if (search) {requestURL += 'search=' + search + '&'; }
    if (page) {requestURL += 'page=' + page + '&'; }
    if (perPage) {requestURL += 'perPage=' + perPage + '&'; }
    if (sortBy) {requestURL += 'sortBy=' + sortBy; }

    return this.http.get<IPolicyPage[]>(`${this.apiURL}/policiescustomers${requestURL}`);
  }

  updatePolicy (policy: IPolicy | number): Observable<any> {
      const id = typeof policy === 'number' ? policy : policy.id;
      console.log(id);
      const url = `${this.apiURL}/policy/${id}`;
      return this.http.put(url, policy).pipe(
        tap()
      );
  }

  getPolicyDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiURL}/policy/${id}`);
  }

  getCustomerPolicies(id) {
    return this.http.get<IPolicyPage>(`${this.apiURL}/policies/${id}`);
  }

}

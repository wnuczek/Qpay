import { Injectable } from '@angular/core';
import { IContact, IContactPage } from '../../../QpayAPI/app/interfaces/contact.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiURL = environment.apiURL;
  constructor(private http: HttpClient) { }

  getContacts(search?: string, page?: number, perPage?: number, sortBy?: string): Observable<IContactPage[]> {
    let requestURL = '?';
    if (search) {requestURL += 'search=' + search + '&'; }
    if (page) {requestURL += 'page=' + page + '&'; }
    if (perPage) {requestURL += 'perPage=' + perPage + '&'; }
    if (sortBy) {requestURL += 'sortBy=' + sortBy; }

    return this.http.get<IContactPage[]>(`${this.apiURL}/contacts${requestURL}`);
  }

  updateContact (policy: IContact | number): Observable<any> {
      const id = typeof policy === 'number' ? policy : policy.id;
      console.log(id);
      const url = `${this.apiURL}/contact/${id}`;
      return this.http.put(url, policy).pipe(
        tap()
      );
  }

  getCustomerContacts(id) {
    return this.http.get<IContactPage>(`${this.apiURL}/contacts/${id}`);
  }

}

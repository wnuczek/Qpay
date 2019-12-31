import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ICustomer, ICustomerPage } from '../../../QpayAPI/app/interfaces/customer.interface';
import { CustomersService } from './customers.service';
import { catchError, finalize } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged, startWith, tap, map, delay } from 'rxjs/operators';



export class CustomersDataSource implements DataSource<ICustomerPage> {

    private customersSubject = new BehaviorSubject<ICustomerPage[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private customersCountSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public total$ = this.customersCountSubject.asObservable();

    constructor(private customersService: CustomersService) {

    }

    loadCustomers(
                    filter: string,
                    pageIndex: number,
                    pageSize: number,
                    sortDirection: string) {

        this.loadingSubject.next(true);

        this.customersService.getCustomers(filter, pageIndex, pageSize, sortDirection ).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(customersPage => {
                this.customersSubject.next(customersPage);
                this.customersCountSubject.next(customersPage['total']);
            });

    }

    connect(collectionViewer: CollectionViewer): Observable<ICustomerPage[]> {
        console.log('Connecting data source');
        return this.customersSubject.asObservable().pipe(
            map(result => result['results'])
          );
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.customersSubject.complete();
        this.loadingSubject.complete();
        this.customersCountSubject.complete();
    }
}

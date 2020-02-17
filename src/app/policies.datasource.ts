import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { IPolicy, IPolicyPage } from '../../../QpayAPI/app/interfaces/policy.interface';
import { PoliciesService } from './policies.service';
import { catchError, finalize } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged, startWith, tap, map, delay } from 'rxjs/operators';



export class PoliciesDataSource implements DataSource<IPolicyPage> {

    private policiesSubject = new BehaviorSubject<IPolicyPage[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private policiesCountSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public total$ = this.policiesCountSubject.asObservable();

    constructor(private policiesService: PoliciesService) {

    }

    loadPolicies(
                    filter: string,
                    pageIndex: number,
                    pageSize: number,
                    sortDirection: string) {

        this.loadingSubject.next(true);

        this.policiesService.getPolicies(filter, pageIndex, pageSize, sortDirection ).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(policiesPage => {
                this.policiesSubject.next(policiesPage);
                this.policiesCountSubject.next(policiesPage['total']);
            });

    }

    connect(collectionViewer: CollectionViewer): Observable<IPolicyPage[]> {
        console.log('Connecting data source');
        return this.policiesSubject.asObservable().pipe(
            map(result => result['results'])
          );
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.policiesSubject.complete();
        this.loadingSubject.complete();
        this.policiesCountSubject.complete();
    }
}

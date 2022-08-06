import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ICustomer } from '../models/customer.model';
import { ConfigService } from './config.service';
import { ICreditCard } from '../models/credit-card.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private ENDPOINT = '/api/customers';
  private CREDIT_CARD_ENDPOINT = '/credit-card';
  private REST_API_SERVER = '';
  constructor(private http: HttpClient, private store: Store, private configService: ConfigService) { 
    this.REST_API_SERVER = configService.REST_API_SERVER;
  }

  public GetCustomer(customerId: number): Observable<any> {
    return this.http.get<any>(`localhost:8000/api/customers/${customerId}`);
  }

  public CreateCustomer(user: any): Observable<any> {
    return this.http.post<any>(`localhost:8000/api/customers`, user);
  }

  public UpdateCustomer(user: any): Observable<any> {
    return this.http.put<any>(`localhost:8000/api/customers`, user);
  }

  public DeleteCustomer(userId: number): Observable<any> {
    return this.http.delete<any>(`localhost:8000/api/customers/${userId}`);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\n ${error.error ? error.error.message : error}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public add(item: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.REST_API_SERVER + this.ENDPOINT, item).pipe(
      tap((c: ICustomer) => console.log(`added card ${c}`)),
      catchError(this.handleError)
    );
  }

  public update(item: ICustomer): Observable<ICustomer> {
    return this.http.put<ICustomer>(this.REST_API_SERVER + this.ENDPOINT + '/' + item.id, item).pipe(
      tap((c: ICustomer) => console.log(`added card ${c}`)),
      catchError(this.handleError)
    );
  }

  public delete(item: ICustomer): Observable<ICustomer> {
    return this.http.delete<ICustomer>(this.REST_API_SERVER + this.ENDPOINT + '/' + item.id).pipe(
      tap((c: ICustomer) => console.log(`deleted card ${c}`)),
      catchError(this.handleError)
    );
  }

  public getAll(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(`${this.REST_API_SERVER + this.ENDPOINT}`)
      .pipe(
        tap(cards => {
          console.log('fetched cases');
        }),
        catchError(this.handleError)
      );
  }

  public getBy(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(this.REST_API_SERVER + this.ENDPOINT + '/' + id).pipe(
      tap((c: ICustomer) => console.log(`got card ${c}`)),
      catchError(this.handleError)
    );
  }

  public getCustomerCreditCard(id: number): Observable<ICreditCard> {
    return this.http.get<ICreditCard>(this.REST_API_SERVER + this.CREDIT_CARD_ENDPOINT + '/' + id).pipe(
      tap((c: ICreditCard) => console.log(`got card ${c}`)),
      catchError(this.handleError)
    );
  }
}

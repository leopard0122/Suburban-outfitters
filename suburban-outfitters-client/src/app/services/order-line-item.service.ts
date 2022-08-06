import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderLineItemService {
  private ENDPOINT = '/api/order-line-item';
  private REST_API_SERVER = '';
  constructor(private http: HttpClient, private store: Store, private configService: ConfigService) {
    this.REST_API_SERVER = configService.REST_API_SERVER;
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

  public add(item: any): Observable<any> {
    return this.http.post<any>(this.REST_API_SERVER + this.ENDPOINT, item).pipe(
      tap((c: any) => console.log(`added card ${c}`)),
      catchError(this.handleError)
    );
  }

  public update(item: any): Observable<any> {

    return this.http.put<any>(this.REST_API_SERVER + this.ENDPOINT + '/' + item.id, item).pipe(
      tap((c: any) => console.log(`added card ${c}`)),
      catchError(this.handleError)
    );
  }

  public delete(item: any): Observable<any> {
    return this.http.delete<any>(this.REST_API_SERVER + this.ENDPOINT + '/' + item.id).pipe(
      tap((c: any) => console.log(`deleted card ${c}`)),
      catchError(this.handleError)
    );
  }

  public getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.REST_API_SERVER + this.ENDPOINT}`)
      .pipe(
        tap(cards => {
          console.log('fetched cases');
        }),
        catchError(this.handleError)
      );
  }

  public getBy(id: number): Observable<any> {
    return this.http.get<any>(this.REST_API_SERVER + this.ENDPOINT + '/' + id).pipe(
      tap((c: any) => console.log(`got card ${c}`)),
      catchError(this.handleError)
    );
  }

  public getByOrderId(order_id: number): Observable<any> {
    return this.http.get<any>(this.REST_API_SERVER + this.ENDPOINT + '/' + order_id).pipe(
      tap((c: any) => console.log(`got card ${c}`)),
      catchError(this.handleError)
    );
  }

}

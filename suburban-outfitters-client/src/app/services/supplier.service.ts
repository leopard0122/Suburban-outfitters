import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ISupplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private ENDPOINT = '/suppliers';
  private REST_API_SERVER = 'http://localhost:8000/api';
  constructor(private http: HttpClient, private store: Store) { }

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

  public add(item: ISupplier): Observable<ISupplier> {
    return this.http.post<ISupplier>(this.REST_API_SERVER + this.ENDPOINT, item).pipe(
      tap((c: ISupplier) => console.log(`added card ${c}`)),
      catchError(this.handleError)
    );
  }

  public update(item: ISupplier): Observable<ISupplier> {
    return this.http.put<ISupplier>(this.REST_API_SERVER + this.ENDPOINT + '/' + item.id, item).pipe(
      tap((c: ISupplier) => console.log(`added ${c}`)),
      catchError(this.handleError)
    );
  }

  public delete(item: ISupplier): Observable<ISupplier> {
    return this.http.delete<ISupplier>(this.REST_API_SERVER + this.ENDPOINT + '/' + item.id).pipe(
      tap((c: ISupplier) => console.log(`deleted ${c}`)),
      catchError(this.handleError)
    );
  }

  public getAll(): Observable<ISupplier[]> {
    return this.http.get<ISupplier[]>(`${this.REST_API_SERVER + this.ENDPOINT}`)
      .pipe(
        tap(items => {
          console.log('fetched items');
        }),
        catchError(this.handleError)
      );
  }

  public getBy(id: number): Observable<ISupplier> {
    return this.http.get<ISupplier>(this.REST_API_SERVER + this.ENDPOINT + '/' + id).pipe(
      tap((c: ISupplier) => console.log(`got ${c}`)),
      catchError(this.handleError)
    );
  }

}

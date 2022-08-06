import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { IInventory } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private ENDPOINT = '/inventory';
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

  public add(item: IInventory): Observable<IInventory> {
    return this.http.post<IInventory>(this.REST_API_SERVER + this.ENDPOINT, item).pipe(
      tap((c: IInventory) => console.log(`added card ${c}`)),
      catchError(this.handleError)
    );
  }

  public update(item: IInventory): Observable<IInventory> {
    return this.http.put<IInventory>(this.REST_API_SERVER + this.ENDPOINT + '/' + item.id, item).pipe(
      tap((c: IInventory) => console.log(`added ${c}`)),
      catchError(this.handleError)
    );
  }

  public delete(item: IInventory): Observable<IInventory> {
    return this.http.delete<IInventory>(this.REST_API_SERVER + this.ENDPOINT + '/' + item.id).pipe(
      tap((c: IInventory) => console.log(`deleted ${c}`)),
      catchError(this.handleError)
    );
  }

  public getAll(): Observable<IInventory[]> {
    return this.http.get<IInventory[]>(`${this.REST_API_SERVER + this.ENDPOINT}`)
      .pipe(
        tap(items => {
          console.log('fetched items');
        }),
        catchError(this.handleError)
      );
  }

  public getBy(id: number): Observable<IInventory> {
    return this.http.get<IInventory>(this.REST_API_SERVER + this.ENDPOINT + '/' + id).pipe(
      tap((c: IInventory) => console.log(`got ${c}`)),
      catchError(this.handleError)
    );
  }
}

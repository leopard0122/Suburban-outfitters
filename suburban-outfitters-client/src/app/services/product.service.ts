import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private ENDPOINT = '/products';
  private REST_API_SERVER = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private store: Store) { }

  public GetAllProducts(username: string, password: string): Observable<any> {
    return this.http.get<any>('localhost:8000/products');
  }

  public GetProductDetails(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(`localhost:8000/products/${productId}`);
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

  public add(item: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.REST_API_SERVER + this.ENDPOINT, item).pipe(
      tap((c: IProduct) => console.log(`added card ${c}`)),
      catchError(this.handleError)
    );
  }

  public update(item: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(this.REST_API_SERVER + this.ENDPOINT + '/' + item.id, item).pipe(
      tap((c: IProduct) => console.log(`added card ${c}`)),
      catchError(this.handleError)
    );
  }

  public delete(item: IProduct): Observable<IProduct> {
    return this.http.delete<IProduct>(this.REST_API_SERVER + this.ENDPOINT + '/' + item.id).pipe(
      tap((c: IProduct) => console.log(`deleted card ${c}`)),
      catchError(this.handleError)
    );
  }

  public getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.REST_API_SERVER + this.ENDPOINT}`)
      .pipe(
        tap(cards => {
          console.log('fetched cases');
        }),
        catchError(this.handleError)
      );
  }

  public getBy(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.REST_API_SERVER + this.ENDPOINT + '/' + id).pipe(
      tap((c: IProduct) => console.log(`got card ${c}`)),
      catchError(this.handleError)
    );
  }

}

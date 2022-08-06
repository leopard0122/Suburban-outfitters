import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, Subject } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ENDPOINT = '/user';
  private LOGIN_ENDPOINT = '/api/login';
  private MY_ORDERS_ENDPOINT = '/api/myOrders'
  private REGISTER_ENDPOINT = '/api/register';
  private PROFILE_ENDPOINT = '/api/profile';
  private CUSTOMER_ENDPOINT = '/api/customer';
  private LOGOUT_ENDPOINT = '/api/logout';
  private UPDATE_PASSWORD_ENDPOINT = '/api/updatepassword';
  private PAYMENT_METHODS_ENDPOINT = '/api/mypaymentmethods';
  
  private REST_API_SERVER: string;
  public currentUser?: IUser;
  public currentUserSubject = new Subject<any>();
  public currentCustomer: any;
  public currentCustomerSubject = new Subject<any>();
  public currentUserPaymentMethods: any;
  public currentUserPaymentMethodsSubject = new Subject<any>();
  public currentUserOrders: any;
  public currentUserOrdersSubject = new Subject<any>();

  constructor(private cookieService: CookieService, private httpClient: HttpClient, private configService: ConfigService) {
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

  public sendGetRequest() {
    return this.httpClient.get(this.ENDPOINT).pipe(retry(3), catchError(this.handleError));
  }

  public deleteAccount(): Observable<any> {
    return this.httpClient.delete(this.ENDPOINT + '/' + this.currentUser.id).pipe(retry(3), catchError(this.handleError));
  }
  public getUserOrders() {
    console.log('getUserOrders');
    return this.httpClient.get<any>(this.REST_API_SERVER + this.MY_ORDERS_ENDPOINT).pipe(
      tap((res: any) => {
        console.log(res);
        this.currentUserOrders = res[0];
        this.currentUserOrdersSubject.next(res[0]);
      }),
      catchError(this.handleError)
    );
  }


  public getUserPaymentMethods() {
    console.log('getUserPaymentMethods');
    return this.httpClient.get<any>(this.REST_API_SERVER + this.PAYMENT_METHODS_ENDPOINT).pipe(
      tap((res: any) => {
        console.log(res);
        this.currentUserPaymentMethods = res[0];
        this.currentUserPaymentMethodsSubject.next(res[0]);
      }),
      catchError(this.handleError)
    );
  }

  public getUserProfile() {
    console.log('getUserProfile');
    return this.httpClient.get<any>(this.REST_API_SERVER + this.PROFILE_ENDPOINT).pipe(
      tap((res: any) => {
        console.log(res);
        this.currentUser = res;
        this.currentUserSubject.next(res);
      }),
      catchError(this.handleError)
    );
  }

  public getUserCustomer() {
    console.log('getUserCustomer');
    return this.httpClient.get<any>(this.REST_API_SERVER + this.CUSTOMER_ENDPOINT).pipe(
      tap((res: any) => {
        console.log(res);
        this.currentCustomer = res[0];
        this.currentCustomerSubject.next(res[0]);
      }),
      catchError(this.handleError)
    );
  }

  public sendRegisterRequest(form: any) {
    return this.httpClient.post<any>(this.REST_API_SERVER + this.REGISTER_ENDPOINT, form).pipe(
      tap((res: any) => {
        if (res.status === 'success') {
          this.setAuth(res);
        } else {
          console.error(res);
        }
      }),
      catchError(this.handleError)
    );
  }
  private setAuth(res): void {
    this.cookieService.set('user_token', res.data.token);
  }
  public sendLoginRequest(form: any) {
    console.log(form);
    return this.httpClient.post<any>(this.REST_API_SERVER + this.LOGIN_ENDPOINT, form).pipe(
      tap((res: any) => {
        if (res.status === 'success') {
          this.setAuth(res);
        } else {
          console.error(res);
        }
      }),
      catchError(this.handleError)
    );
  }

  public sendLogoutRequest() {
    console.log('did log out');
    return this.httpClient.post<any>(this.REST_API_SERVER + this.LOGOUT_ENDPOINT, null).pipe(
      tap((res: any) => {
        console.log(res);
        this.cookieService.delete('user_token');
        this.currentUser = null;
        this.currentUserSubject.next(null);
      }),
      catchError(this.handleError)
    );
  }
  public sendUpdatePasswordRequest(form: any) {
    console.log(form);
    // merge new password with this.currentUser
    return this.httpClient.post<any>(this.REST_API_SERVER + this.UPDATE_PASSWORD_ENDPOINT, form).pipe(
      tap((res: any) => {
        if (res.status === 'success') {
          this.setAuth(res);
        } else {
          console.error(res);
        }
      }),
      catchError(this.handleError)
    );
  }
}

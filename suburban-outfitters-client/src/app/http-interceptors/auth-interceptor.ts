import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Clone the request and replace the original headers with
    // cloned headers, updated with application/json content type
    if (this.cookieService.check('user_token')) {
      const newReq = req.clone({
        headers: req.headers
          .set('Authorization', 'Bearer ' + this.cookieService.get('user_token'))
      });

      // send authorized request to next handler
      return next.handle(newReq);
    }

    // send request with header to the next handler.
    return next.handle(req);
  }
}

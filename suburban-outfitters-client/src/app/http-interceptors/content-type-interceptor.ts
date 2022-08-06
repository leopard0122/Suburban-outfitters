import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Clone the request and replace the original headers with
    // cloned headers, updated with application/json content type
    const newReq = req.clone({
      headers: req.headers
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
    });

    // send cloned request with header to the next handler.
    return next.handle(newReq);
  }
}

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authData = localStorage.getItem('eReturns-token');

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authData}`
      }
    });

    return next.handle(request);
  }
}

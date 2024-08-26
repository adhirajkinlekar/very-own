import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from './app/app.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private appService: AppService) {}

  
  getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';').shift();
    return '';
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from localStorage or wherever it's stored
    const token = this.getCookie('VERY_OWN_JWT_TOKEN');

    if (token) {
      // Clone the request and attach the token to the headers
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        if ([401,403].includes(error.status)) {

          this.appService.deleteCookie('VERY_OWN_JWT_TOKEN');
        }
        
        return throwError(() => error);
      }),
      finalize(() => {
        // If you had spinner service, you can uncomment the following line
        // this.service.showSpinner.next(false);
      })) 
  }
}

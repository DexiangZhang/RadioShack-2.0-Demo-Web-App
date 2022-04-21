import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

//when we make any HTTP request, the user’s token will be attached automatically.
export class TokenService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: any, next: any): Observable<any> {
    const token = localStorage.getItem('id_token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

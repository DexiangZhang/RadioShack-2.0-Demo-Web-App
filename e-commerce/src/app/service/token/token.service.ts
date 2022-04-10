import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// use for jwt token, but not use in this project since jwt cannot be setup in backend, it get error
export class TokenService implements HttpInterceptor {
  constructor() {}

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

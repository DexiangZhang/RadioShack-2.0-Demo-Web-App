import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.userService.refreshAccessToken().subscribe({
            next: (data: any) => {
              if (data.msg == 'New Token Generated') {
                localStorage.setItem('id_token', data.idToken);
                localStorage.setItem('refresh_token', data.refreshToken);

                const expiresAt = new Date(
                  Date.now() +
                    data.expiresIn.replace(/\D/g, '') * (60 * 60 * 1000)
                ).toLocaleString();

                localStorage.setItem('expires_at', expiresAt);
                //Clone our fieled request ant try to resend it

                request = request.clone({
                  headers: request.headers.set(
                    'Authorization',
                    'Bearer ' + data.idToken
                  ),
                });
                window.location.reload();
                return next.handle(request);
              } else {
                console.log(data);
              }

              return;
            },
            error: (err: any) => {
              this.userService.logout();
              this.userService.changeLoginValue(false);
              this.router.navigate(['/']);
            },
          });
        }

        const error = 'Token Expired!';
        return throwError(() => error); // can be catch by error handler in component side
      })
    );
  }
}

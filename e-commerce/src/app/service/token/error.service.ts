import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  mergeMap,
  Observable,
  Subject,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}
  // private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
  //   null
  // );
  // private tokenRefreshedSource = new BehaviorSubject();
  // private tokenRefreshed$ = this.tokenRefreshedSource.asObservable();
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // this.refreshTokenSubject.next(null);
          // this.userService.refreshAccessToken().pipe(
          //   switchMap((data: any) => {
          //     localStorage.setItem('id_token', data.idToken);
          //     localStorage.setItem('refresh_token', data.refreshToken);

          //     const expiresAt = new Date(
          //       Date.now() + data.expiresIn.replace(/\D/g, '') * 1000
          //     ).toLocaleString();

          //     localStorage.setItem('expires_at', expiresAt);
          //     //Clone our fieled request ant try to resend it

          //     const cloned = request.clone({
          //       headers: request.headers.set(
          //         'Authorization',
          //         'Bearer ' + data.idToken
          //       ),
          //     });

          //     this.refreshTokenSubject.next(data.idToken);
          //     return next.handle(cloned);
          //   }),
          //   catchError((err) => {
          //     this.userService.logout();
          //     this.userService.changeLoginValue(false);
          //     this.router.navigate(['/']);
          //     return throwError(() => err);
          //   })
          // );

          this.userService.refreshAccessToken().subscribe({
            next: (data: any) => {
              if (data.msg == 'New Token Generated') {
                localStorage.setItem('id_token', data.idToken);
                localStorage.setItem('refresh_token', data.refreshToken);

                const expiresAt = new Date(
                  Date.now() + data.expiresIn.replace(/\D/g, '') * 1000
                ).toLocaleString();

                localStorage.setItem('expires_at', expiresAt);
                //Clone our fieled request ant try to resend it

                request = request.clone({
                  headers: request.headers.set(
                    'Authorization',
                    'Bearer ' + data.idToken
                  ),
                });
                // this.tokenRefreshed$.next(data.idToken);
                // window.location.reload();
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

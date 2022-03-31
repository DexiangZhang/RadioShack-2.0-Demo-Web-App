import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  validateUserLogin(user: { username: any; password: any }): Observable<any> {
    return this.http.post('http://localhost:8080/api/user/signIn', {
      username: user.username,
      password: user.password,
    });
  }
}

import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  backend_URL = environment.backendServer;
  backend_port = environment.backendPort;

  validateUserLogin(user: any): Observable<any> {
    return this.http.post(
      `${this.backend_URL}:${this.backend_port}/api/user/signIn`,
      user
    );
  }

  // require {response:text} in order to receive the text, default is json format if not provided
  createNewUser(user: any): Observable<any> {
    return this.http.post(
      `${this.backend_URL}:${this.backend_port}/api/user/signUp`,
      user,
      {
        responseType: 'text',
      }
    );
  }
}

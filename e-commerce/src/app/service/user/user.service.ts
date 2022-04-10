import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  backend_URL = environment.backendServer;
  backend_port = environment.backendPort;
  id = localStorage.getItem('user_id');

  validateUserLogin(user: any): Observable<any> {
    return this.http.post(
      `${this.backend_URL}:${this.backend_port}/api/user/signIn`,
      user
    );
  }

  // jwt token session but not setup yet, since jwt is not work in backend

  // private setSession(authResult: any) {
  //   // get the expireate date that is "authResult.expiresIn" hour from now time
  //   const expiresAt = new Date(
  //     Date.now() + authResult.expiresIn.replace(/\D/g, '') * (60 * 60 * 1000)
  //   ).toLocaleString();
  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem('expires_at', expiresAt);
  // }

  // logout() {
  //   localStorage.removeItem('id_token');
  //   localStorage.removeItem('expires_at');
  // }

  // create new account
  createNewUser(user: any): Observable<any> {
    return this.http.post(
      `${this.backend_URL}:${this.backend_port}/api/user/signUp`,
      user,
      {
        responseType: 'text', // need to tell the angular the response is text from backend, not object (default if not tell)
      }
    );
  }

  // reset user password by sending user info
  resetPassword(user: any): Observable<any> {
    return this.http.post(
      `${this.backend_URL}:${this.backend_port}/api/user/resetPassword`,
      user,
      {
        responseType: 'text',
      }
    );
  }

  // get all user accounts
  getAllUsers(): Observable<any> {
    return this.http.get(
      `${this.backend_URL}:${this.backend_port}/api/user/fetchAllUsers`
    );
  }

  // get single user profile information
  getUserProfile(): Observable<any> {
    return this.http.get(
      `${this.backend_URL}:${this.backend_port}/api/user/getUserProfile/${this.id}`
    );
  }

  // update user profile
  updateUserProfile(user: any): Observable<any> {
    return this.http.patch(
      `${this.backend_URL}:${this.backend_port}/api/user/updateUserProfile/${this.id}`,
      user,
      {
        responseType: 'text',
      }
    );
  }

  // create new order for the user
  createUserOrder(order: any): Observable<any> {
    return this.http.post(
      `${this.backend_URL}:${this.backend_port}/api/user/placeOrder/${this.id}`,
      order,
      {
        responseType: 'text',
      }
    );
  }

  // get all the order history for all user
  getAllUserOrders(): Observable<any> {
    return this.http.get(
      `${this.backend_URL}:${this.backend_port}/api/user/getAllUserOrders`
    );
  }

  //get single user order history by user id
  getUserOrderHistory(): Observable<any> {
    return this.http.get(
      `${this.backend_URL}:${this.backend_port}/api/user/getUserOrders/${this.id}`
    );
  }

  // get single order number's product details
  getUserOrderProducts(order_id: any): Observable<any> {
    return this.http.get(
      `${this.backend_URL}:${this.backend_port}/api/user/getUserOrderProduct/${order_id}`
    );
  }
}

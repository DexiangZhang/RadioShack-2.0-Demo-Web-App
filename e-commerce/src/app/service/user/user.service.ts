import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  backend_URL = environment.backendServer;
  backend_port = environment.backendPort;

  // the way to communicate parent router and child router (router-outlet) with using BehaviorSubject
  loginValue = new BehaviorSubject(this.loggedIn());
  loginValue$ = this.loginValue.asObservable();

  username = new BehaviorSubject(localStorage.getItem('username'));
  username$ = this.username.asObservable();

  // update login status if user is logged in or not
  changeLoginValue(status: boolean) {
    this.loginValue.next(status);
  }

  // update username
  changeUsername(username: string) {
    this.username.next(username);
  }

  // refresh token
  refreshAccessToken() {
    return this.http.post(
      `${this.backend_URL}:${this.backend_port}/api/user/refreshToken`,
      { token: localStorage.getItem('refresh_token') }
    );
  }

  // validate user login
  validateUserLogin(user: any): Observable<any> {
    return this.http.post(
      `${this.backend_URL}:${this.backend_port}/api/user/signIn`,
      user
    );
  }

  // remove all the localstorage data
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
  }

  // authorized if user is logged in or not
  loggedIn() {
    return !!localStorage.getItem('id_token');
  }

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
      `${this.backend_URL}:${this.backend_port}/api/user/getUserProfile`
    );
  }

  // update user profile
  updateUserProfile(user: any): Observable<any> {
    return this.http.patch(
      `${this.backend_URL}:${this.backend_port}/api/user/updateUserProfile`,
      user,
      {
        responseType: 'text',
      }
    );
  }

  // create new order for the user
  createUserOrder(order: any): Observable<any> {
    return this.http.post(
      `${this.backend_URL}:${this.backend_port}/api/user/placeOrder`,
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
      `${this.backend_URL}:${this.backend_port}/api/user/getUserOrders`
    );
  }

  // get single order number's product details
  getUserOrderProducts(order_id: any): Observable<any> {
    return this.http.get(
      `${this.backend_URL}:${this.backend_port}/api/user/getUserOrderProduct/${order_id}`
    );
  }

  //get the user own products
  getUserProducts(): Observable<any> {
    return this.http.get(
      `${this.backend_URL}:${this.backend_port}/api/user/getUserProducts`
    );
  }
}

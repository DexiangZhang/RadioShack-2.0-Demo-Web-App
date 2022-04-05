import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  backend_URL = environment.backendServer;
  backend_port = environment.backendPort;
  user_id = localStorage.getItem('user_id');

  // create new product
  createNewProduct(product: any): Observable<any> {
    return this.http.post(
      `${this.backend_URL}:${this.backend_port}/api/product/uploadNewProduct/${this.user_id}`,
      product,
      {
        responseType: 'text',
      }
    );
  }

  // get all product
  fetchAllProduct(): Observable<any> {
    return this.http.get(
      `${this.backend_URL}:${this.backend_port}/api/product/fetchAllProducts`
    );
  }
}

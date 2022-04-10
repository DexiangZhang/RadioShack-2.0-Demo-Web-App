import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  //delete product
  deleteProduct(product_id: number): Observable<any> {
    return this.http.delete(
      `${this.backend_URL}:${this.backend_port}/api/product/deleteProduct/${product_id}`,
      {
        responseType: 'text',
      }
    );
  }

  // update product
  updateProduct(product: any, product_id: any): Observable<any> {
    return this.http.patch(
      `${this.backend_URL}:${this.backend_port}/api/product/updateProductInfo/${product_id}`,
      product,
      {
        responseType: 'text',
      }
    );
  }
}

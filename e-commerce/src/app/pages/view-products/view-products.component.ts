import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ProductService } from 'src/app/service/product/product.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss'],
})
export class ViewProductsComponent implements OnInit {
  products!: any[];
  sortOptions!: any[];
  sortOrder!: number;
  sortField!: string;
  sortKey!: string;

  cartProduct: any = {};
  cartProductList: any = [];

  totalCart: number = 0;
  totalPrice: number = 0;
  orderSummary: boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.getAllProduct();

    this.sortOptions = [
      { label: 'Price High to Low', value: '!unit_price' },
      { label: 'Price Low to High', value: 'unit_price' },
    ];

    this.primengConfig.ripple = true;
  }

  getAllProduct() {
    // get all product this user has uploaded
    this.productService.fetchAllProduct().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => console.log(error),
    });
  }

  severityColor(val: any) {
    if (val === 'Instock') {
      return 'success';
    } else {
      return 'danger';
    }
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  // add to cart function
  addToCart(product: any) {
    // if product is existed in cart, then update the quantity, else add to cart and add product detail to array
    if (!this.cartProduct[product.product_id]) {
      this.cartProduct[product.product_id] = 1;
      this.cartProductList.push(product);
    } else {
      this.cartProduct[product.product_id] += 1;
    }
    this.totalCart++;
    this.totalPrice += product.unit_price;

    //  if(this.cartProduct)
    // check if the product is already in the cart
  }

  onCartClick() {
    this.orderSummary = true;
  }

  clearOrder() {
    this.cartProduct = {};
    this.totalCart = 0;
    this.totalPrice = 0;
    this.cartProductList = [];

    this.orderSummary = false;
  }
}

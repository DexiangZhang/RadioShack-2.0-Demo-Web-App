import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { ProductService } from 'src/app/service/product/product.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss'],
  providers: [MessageService],
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

  orderDetail: any = {};
  user_id = localStorage.getItem('user_id');
  user: any;
  outOfLimit = false;
  orderLimitCount: any = {};

  orderStatus = ['Shipped', 'Processing', 'Delivered', 'Transit'];

  constructor(
    private primengConfig: PrimeNGConfig,
    private productService: ProductService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllProduct();
    this.getCustomerInfo();
    this.sortOptions = [
      { label: 'Price High to Low', value: '!unit_price' },
      { label: 'Price Low to High', value: 'unit_price' },
    ];

    this.primengConfig.ripple = true;
  }

  /*
     display the product detail
  */

  // get all product
  getAllProduct() {
    this.productService.fetchAllProduct().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => console.log(error),
    });
  }

  // get user information
  getCustomerInfo() {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        // get correct without reload:  this.user = data.find((user: any) => user.user_id == this.user_id);
        this.user = data;
      },
      error: (error) => console.log(error),
    });
  }

  // message color selector based on product status
  severityColor(val: any) {
    if (val === 'Instock') {
      return 'success';
    } else {
      return 'danger';
    }
  }

  // sort the product list either by price high to low or low to high
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

  /*
     functionality to add to cart and display the order product summary
  */

  // add to cart function
  addToCart(product: any) {
    // if product is existed in cart, then update the quantity, else add to cart and add product detail to array
    if (!this.cartProduct[product.product_id]) {
      this.cartProduct[product.product_id] = 1;
      this.totalCart++;
      this.totalPrice += product.unit_price;

      // make sure the list only contains unique product
      this.cartProductList.push(product);
    } else if (this.cartProduct[product.product_id] < product.quality) {
      this.cartProduct[product.product_id] += 1;
      this.totalCart++;
      this.totalPrice += product.unit_price;
    }
  }

  // click the cart icon to display the order summary
  onCartClick() {
    this.orderSummary = true;
  }

  // clear all the selected product and order summary and close the window
  clearOrder() {
    this.cartProduct = {};
    this.totalCart = 0;
    this.totalPrice = 0;
    this.cartProductList = [];

    this.orderSummary = false;
  }

  /*
    create order and send to server section

  */

  // create order and send to server
  createOrder() {
    let orderProductArr = [];
    // get product infomation from cartProductList and cartProduct
    for (let pro of this.cartProductList) {
      orderProductArr.push({
        totalPrice: pro.unit_price * this.cartProduct[pro.product_id],
        quality: this.cartProduct[pro.product_id],
        price: pro.unit_price,
        name: pro.product_name,
        image: pro.product_image,
        category: pro.category,
        id: pro.product_id,
      });
    }

    // random number in orderStatus to get the order status randomly
    let randomNumber = Math.floor(Math.random() * this.orderStatus.length);

    this.orderDetail = {
      orderStatus: this.orderStatus[randomNumber],
      totalPrice: this.totalPrice,
      firstName: this.user.first_name,
      lastName: this.user.last_name,
      deliAddress: this.user.home_address,
      contactNum: this.user.phone_num,
      ItemLists: orderProductArr,
    };
  }

  // send order to server
  confirmOrder() {
    this.createOrder(); // product order info

    // send order to server
    this.userService.createUserOrder(this.orderDetail).subscribe({
      next: (msg) => {
        if (msg == 'Thank you for your order!') {
          console.log(msg);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: msg,
            life: 3000,
          });
          this.getAllProduct();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failure',
            detail: msg,
            life: 3000,
          });
        }
      },
      error: (error) => console.log(error),
    });

    this.clearOrder();
    this.orderDetail = {};
  }
}

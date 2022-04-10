import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-view-trans-history',
  templateUrl: './view-trans-history.component.html',
  styleUrls: ['./view-trans-history.component.scss'],
})
export class ViewTransHistoryComponent implements OnInit {
  orderHistory: any = [];
  orderProductList: any = [];
  viewProductSummary: boolean = false;
  userID = parseInt(localStorage.getItem('user_id')!);

  getUserOrders() {
    this.userService.getUserOrderHistory().subscribe({
      next: (data) => {
        // get correct order without refreshing using getalluserorder() ==> this.orderHistory = data.filter(
        //   (order: { user_id: number }) => order.user_id === this.userID
        // );
        this.orderHistory = data;
      },
      error: (error) => console.log(error),
    });
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserOrders();
  }

  // get user order products
  getUserOrderProducts(number: any) {
    this.userService.getUserOrderProducts(number).subscribe({
      next: (data) => {
        this.orderProductList = data;
      },
      error: (error) => console.log(error),
    });
  }

  // view product summary when click on order for more details
  viewOrderProducts(orderNum: any) {
    this.viewProductSummary = true;

    this.getUserOrderProducts(orderNum);
  }

  // color for each difffernt product status in order history
  severityColor(orderStatus: any) {
    if (orderStatus === 'Shipped') {
      return 'warning';
    } else if (orderStatus === 'Processing') {
      return 'info';
    } else if (orderStatus === 'Delivered') {
      return 'success';
    } else orderStatus === 'Transit';
    return 'danger';
  }
}

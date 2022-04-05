import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  user_id: number = 0;

  items!: MenuItem[];
  constructor(public router: Router) {
    this.user_id = parseInt(localStorage.getItem('user_id')!);
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-home',
            routerLink: ['advertise'],
          },
        ],
      },
      {
        label: 'Main',
        items: [
          {
            label: 'Market',
            icon: 'pi pi-fw pi-globe',
            routerLink: ['market'],
          }, // -> add to card, click cart to show new page, with amount and button to submit order
          {
            label: 'Product',
            icon: 'pi pi-fw pi-box',
            routerLink: ['product'],
          }, // crud user product
          {
            label: 'Transaction',
            icon: 'pi pi-fw pi-history',
            routerLink: ['transaction'],
          }, // order hsitroy
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['profile'],
          },
        ],
      },
    ];
  }

  logout() {
    localStorage.removeItem('user_id');
    this.router.navigate(['']);
  }
}

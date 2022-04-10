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
    // create the naviagtor menu
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: ['.'], // default page for child component router
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Market',
        icon: 'pi pi-fw pi-globe',
        routerLink: ['market'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Product',
        icon: 'pi pi-fw pi-box',
        routerLink: ['product'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Transaction',
        icon: 'pi pi-fw pi-history',
        routerLink: ['transaction'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['profile'],
        routerLinkActiveOptions: { exact: true },
      },
    ];
  }

  // logout the user and redirect to login page
  logout() {
    localStorage.removeItem('user_id');
    this.router.navigate(['']);
  }
}

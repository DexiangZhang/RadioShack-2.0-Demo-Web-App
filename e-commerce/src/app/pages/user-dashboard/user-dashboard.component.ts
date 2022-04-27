import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  providers: [ConfirmationService],
})
export class UserDashboardComponent implements OnInit {
  items!: MenuItem[];

  isLogin!: boolean;
  username!: any;

  tokenComfirmation!: any;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private userService: UserService
  ) {
    // get localstorage username and login status to display in the header
    // to get correct data even if the broswer is refreshed and change the value when
    // the child component is change the values
    this.userService.loginValue$.subscribe((status) => (this.isLogin = status));
    this.userService.username$.subscribe((name) => (this.username = name));

    // this.userService.tokenTimer$.subscribe(
    //   (token) => (this.tokenComfirmation = token)
    // );
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
    this.confirmationService.confirm({
      message: 'Are you sure you want to logout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-circle',
      acceptLabel: 'Logout',
      rejectLabel: 'Cancel',
      accept: () => {
        this.userService.logout();
        this.router.navigate(['']);
        this.isLogin = false;
      },
    });
  }

  // navigate to the login page
  login() {
    this.router.navigate(['login']);
  }

  // need to show the popup when user login, and the popup will show  after certain time
  // refreshTokenConfirmation() {
  //   if (this.tokenComfirmation) {
  //     setTimeout(() => {
  //       // this.confirmationService.confirm({
  //       //   message: `Your Access Token is going to expire at ${localStorage.getItem(
  //       //     'expires_at'
  //       //   )}. Do you want to refresh token?`,
  //       //   header: 'Warning',
  //       //   icon: 'pi pi-exclamation-circle',
  //       //   acceptLabel: 'Keep Login',
  //       //   rejectLabel: 'Cancel',
  //       //   accept: () => {
  //       //     // this.userService.logout();
  //       //     // this.router.navigate(['']);
  //       //     // this.isLogin = false;
  //       //     console.log('youre pressed yes');
  //       //   },
  //       //   reject: () => {
  //       //     this.tokenComfirmation = false;
  //       //   },
  //       // });

  //       console.log('refresh token confirmation');
  //       this.tokenComfirmation = false;
  //     }, 5000);
  //   }
  // }
}

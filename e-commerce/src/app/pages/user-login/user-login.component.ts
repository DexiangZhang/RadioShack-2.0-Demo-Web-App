import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PrimeNGConfig } from 'primeng/api';

import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  formRef = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(''),
  });

  msg: string = '';
  isError: boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // if the save username is checked, then set the username to the previous saved username
    if (localStorage.getItem('rememberUsername')) {
      this.formRef.setValue({
        username: localStorage.getItem('rememberUsername'),
        password: '',
        rememberMe: true,
      });
    }

    this.primengConfig.ripple = true;
  }

  //login user after vertifying the credentials of the user
  submit() {
    let userLogin = this.formRef.value;

    let rememberUser = userLogin.rememberMe;

    this.userService.validateUserLogin(userLogin).subscribe({
      next: (data) => {
        if (data.msg == 'Success') {
          if (rememberUser) {
            localStorage.setItem('rememberUsername', userLogin.username);
          } else {
            localStorage.removeItem('rememberUsername');
          }

          // 1 hour from now to expire the token
          const expiresAt = new Date(
            Date.now() + data.expiresIn.replace(/\D/g, '') * (60 * 60 * 1000)
          ).toLocaleString();

          localStorage.setItem('id_token', data.idToken);
          localStorage.setItem('expires_at', expiresAt);

          // pass the url with some value ===> eg. userDashboard/user_1
          this.router.navigate(['userDashboard', userLogin.username]).then(
            // reload the page, to avoid any bug for wrong user information
            () => window.location.reload()
          );
          this.isError = false;
        } else {
          this.msg = data.msg;
          this.isError = true;
        }
      },
      error: (error) => console.log(error),
    });
    this.formRef.reset();
  }
}

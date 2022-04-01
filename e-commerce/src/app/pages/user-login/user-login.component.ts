import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  formRef = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  msg: string = '';
  isError: boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    public userService: UserService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  submit() {
    let userLogin = this.formRef.value;

    this.userService.validateUserLogin(userLogin).subscribe({
      next: (data) => {
        if (data.msg == 'Success') {
          localStorage.setItem('user_id', data.id);
          // pass the url with some value ===> eg. userDashboard/user_1
          this.router.navigate(['userDashboard', userLogin.username]);
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

import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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

    this.userService.validateUserLogin(userLogin).subscribe(
      (data) => {
        if (data.msg == 'Success') {
          //this.router.navigate(["userhome", userLogin.username]);
          console.log(data);
        } else {
          this.msg = data.msg;
        }
      },
      (error) => console.log(error)
    );
    this.formRef.reset();
  }
}

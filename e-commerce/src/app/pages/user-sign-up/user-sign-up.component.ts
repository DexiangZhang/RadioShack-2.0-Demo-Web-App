import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PrimeNGConfig } from 'primeng/api';

import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.scss'],
})
export class UserSignUpComponent implements OnInit {
  formRef = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    homeAddress: new FormControl('', [Validators.required]),
    phoneNum: new FormControl('', [
      // allow the phone number only to be numbers and 10 digits
      Validators.required,
      Validators.min(1000000000),
      Validators.max(9999999999),
    ]),
  });

  msg: string = '';
  isRecMsg: boolean = false;
  msgType: string = 'success';

  constructor(
    private primengConfig: PrimeNGConfig,
    public userService: UserService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  // require for output the error message in the html
  get email() {
    return this.formRef.get('email');
  }
  get phoneNum() {
    return this.formRef.get('phoneNum');
  }

  // create new user accounts
  submit() {
    let newUserData = this.formRef.value;

    this.userService.createNewUser(newUserData).subscribe({
      next: (msg) => {
        if (msg == 'Thanks! Your account has been successfully created') {
          this.msg = msg;
          this.msgType = 'success';
        } else {
          this.msg = msg;
          this.msgType = 'error';
        }
        this.isRecMsg = true;
      },
      error: (error) => console.log(error),
    });
    this.formRef.reset();
  }
}

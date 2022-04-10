import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PrimeNGConfig } from 'primeng/api';

import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-reset-pw',
  templateUrl: './user-reset-pw.component.html',
  styleUrls: ['./user-reset-pw.component.scss'],
})
export class UserResetPWComponent implements OnInit {
  formRef = new FormGroup({
    username: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
  });

  msg: string = '';
  msgType: string = '';
  isRecMsg: boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  // reset user password after vertifying the credentials of the user
  resetPassword() {
    let userResetInfo = this.formRef.value;

    this.userService.resetPassword(userResetInfo).subscribe({
      next: (msg) => {
        if (msg == 'Your password has been reset!') {
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

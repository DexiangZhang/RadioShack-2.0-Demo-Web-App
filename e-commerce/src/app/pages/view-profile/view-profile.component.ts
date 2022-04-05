import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
  providers: [MessageService],
})
export class ViewProfileComponent implements OnInit {
  formRef = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    homeAddress: new FormControl('', [Validators.required]),
    phoneNum: new FormControl('', [
      Validators.required,
      Validators.min(1000000000),
      Validators.max(9999999999),
    ]),
  });

  constructor(
    private primengConfig: PrimeNGConfig,
    public userService: UserService,

    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.formRef.patchValue({
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
          homeAddress: data.home_address,
          phoneNum: Number(data.phone_num),
        });
      }, // success path
      error: (err) => {
        console.log(err);
      }, // error path
    });

    this.primengConfig.ripple = true;
  }

  get email() {
    return this.formRef.get('email');
  }

  get phoneNum() {
    return this.formRef.get('phoneNum');
  }

  submit() {
    let updatedInfo = this.formRef.value;

    this.userService.updateUserProfile(updatedInfo).subscribe({
      next: (msg: any) => {
        if (msg == 'Your information has been updated!') {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: msg,
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failure',
            detail: msg,
            life: 3000,
          });
        }
      }, // success path
      error: (err: any) => {
        console.log(err);
      }, // error path
    });
  }
}

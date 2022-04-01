import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  user_id: number = 0;

  constructor() {
    this.user_id = parseInt(localStorage.getItem('user_id')!);
  }

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('user_id');
  }
}

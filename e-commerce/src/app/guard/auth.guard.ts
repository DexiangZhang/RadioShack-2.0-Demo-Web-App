import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.loggedIn()) {
      return true;
    } else {
      this.userService.logout();
      this.userService.changeLoginValue(false);
      this.router.navigate(['/']);
      console.log('Not Authorized User or Acess Token Expired! Please Login!');
      return false;
    }
  }
}

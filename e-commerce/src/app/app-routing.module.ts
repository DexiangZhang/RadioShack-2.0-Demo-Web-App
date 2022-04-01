import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';

import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserSignUpComponent } from './pages/user-sign-up/user-sign-up.component';
import { ViewProductsComponent } from './pages/view-products/view-products.component';

const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'newUser', component: UserSignUpComponent },
  {
    path: 'userDashboard/:username',
    component: UserDashboardComponent,
    children: [{ path: 'viewItem', component: ViewProductsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

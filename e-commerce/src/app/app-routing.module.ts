import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallToActionComponent } from './pages/call-to-action/call-to-action.component';
import { ShareOwnProductsComponent } from './pages/share-own-products/share-own-products.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';

import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserSignUpComponent } from './pages/user-sign-up/user-sign-up.component';
import { ViewProductsComponent } from './pages/view-products/view-products.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { ViewTransHistoryComponent } from './pages/view-trans-history/view-trans-history.component';

const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'newUser', component: UserSignUpComponent },
  {
    path: 'userDashboard/:username',
    component: UserDashboardComponent,
    children: [
      { path: '', component: CallToActionComponent },
      { path: 'advertise', component: CallToActionComponent },
      { path: 'market', component: ViewProductsComponent },
      { path: 'product', component: ShareOwnProductsComponent },
      { path: 'transaction', component: ViewTransHistoryComponent },
      { path: 'profile', component: ViewProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

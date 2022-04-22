import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { CallToActionComponent } from './pages/call-to-action/call-to-action.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ShareOwnProductsComponent } from './pages/share-own-products/share-own-products.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';

import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserResetPWComponent } from './pages/user-reset-pw/user-reset-pw.component';
import { UserSignUpComponent } from './pages/user-sign-up/user-sign-up.component';
import { ViewProductsComponent } from './pages/view-products/view-products.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { ViewTransHistoryComponent } from './pages/view-trans-history/view-trans-history.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
    children: [
      { path: '', component: CallToActionComponent },
      { path: 'login', component: UserLoginComponent },
      { path: 'signUp', component: UserSignUpComponent },
      { path: 'resetPassword', component: UserResetPWComponent },
      { path: 'market', component: ViewProductsComponent },
      {
        path: 'product',
        component: ShareOwnProductsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'transaction',
        component: ViewTransHistoryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: ViewProfileComponent,
        canActivate: [AuthGuard],
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// style import
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { UserSignUpComponent } from './pages/user-sign-up/user-sign-up.component';
import { PasswordModule } from 'primeng/password';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { ViewProductsComponent } from './pages/view-products/view-products.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserSignUpComponent,
    UserDashboardComponent,
    ViewProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    PasswordModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

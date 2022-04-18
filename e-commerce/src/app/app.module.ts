import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// own components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CallToActionComponent } from './pages/call-to-action/call-to-action.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { ViewTransHistoryComponent } from './pages/view-trans-history/view-trans-history.component';
import { ShareOwnProductsComponent } from './pages/share-own-products/share-own-products.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { ViewProductsComponent } from './pages/view-products/view-products.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserSignUpComponent } from './pages/user-sign-up/user-sign-up.component';
import { UserResetPWComponent } from './pages/user-reset-pw/user-reset-pw.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TokenService } from './service/token/token.service';
import { AuthGuard } from './guard/auth.guard';

// style import
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { MenuModule } from 'primeng/menu';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToolbarModule } from 'primeng/toolbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BadgeModule } from 'primeng/badge';
import { ImageModule } from 'primeng/image';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserSignUpComponent,
    UserDashboardComponent,
    ViewProductsComponent,
    CallToActionComponent,
    ViewProfileComponent,
    ViewTransHistoryComponent,
    ShareOwnProductsComponent,
    UserResetPWComponent,
    NotFoundComponent,
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
    MenubarModule,
    MenuModule,
    BrowserAnimationsModule,
    DataViewModule,
    PanelModule,
    DropdownModule,
    DialogModule,
    RatingModule,
    TableModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    ProgressBarModule,
    ToolbarModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    BadgeModule,
    ImageModule,
    FieldsetModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

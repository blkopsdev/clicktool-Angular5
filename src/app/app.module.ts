import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler  } from '@angular/core';
import { routes } from './app.router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';

import { AgreementsComponent } from './signup/agreements/agreements.component';
import { AccountInfoComponent } from './signup/account-info/account-info.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ContributionComponent } from './signup/contribution/contribution.component';
import { UploaderComponent } from './shared/common/uploader/uploader.component';
import { IdentificationComponent } from './signup/identification/identification.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHeaderComponent } from './shared/common/dashboard-header/dashboard-header.component';
import { DashboardNavComponent } from './shared/common/dashboard-nav/dashboard-nav.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PasswordComponent } from './password/password.component';
import { ApiService, HTTPmethod } from './api.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpInterceptorServiceService  } from './shared/services/http-interceptor-service.service'
import { ErrorHandlerService } from './shared/services/error-handler-service.service'

import { MemberService } from './shared/services/member.service'
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

import { AuthGuard } from './shared/guards/auth.guard'
import { IsLoggedInGuard } from './shared/guards/is-logged-in.guard';
import { HomepageHeaderComponent } from './homepage/shared/homepage-header/homepage-header.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './shared/forms/login-form/login-form.component';
import { AlertComponent } from './shared/common/alert/alert.component';

import { FileUploadModule } from 'ng2-file-upload';
import { IfAdminDirective } from './shared/directives/if-admin.directive';
import { UsersComponent } from './users/users.component';
import { DocumentsComponent } from './documents/documents.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { TextActionComponent } from './shared/common/text-action/text-action.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { MachineAnimationComponent } from './homepage/shared/machine-animation/machine-animation.component';
import { TimelimeComponent } from './homepage/shared/timelime/timelime.component';
import { YellowboxComponent } from './homepage/shared/timelime/yellowbox/yellowbox.component';
import { SmallScreenComponent } from './homepage/shared/small-screen/small-screen.component';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AgreementsComponent,
    AccountInfoComponent,
    HeaderComponent,
    FooterComponent,
    ContributionComponent,
    UploaderComponent,
    IdentificationComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardNavComponent,
    TransactionsComponent,
    PasswordComponent,
    HomepageHeaderComponent,
    LoginComponent,
    LoginFormComponent,
    AlertComponent,
    IfAdminDirective,
    UsersComponent,
    DocumentsComponent,
    PasswordResetComponent,
    TextActionComponent,
    UpdatePasswordComponent,
    MachineAnimationComponent,
    TimelimeComponent,
    YellowboxComponent,
    SmallScreenComponent
  ],
  imports: [
    BrowserModule,
    routes,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FileUploadModule,
    ReactiveFormsModule
  ],
  providers: [
    MemberService,
    ApiService,
    AppComponent,
    AuthGuard,
    IsLoggedInGuard,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorServiceService, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

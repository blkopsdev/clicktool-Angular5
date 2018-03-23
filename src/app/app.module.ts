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
import { FormsModule } from '@angular/forms';
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
import { IsLoggedInGuard } from './shared/guards/is-logged-in.guard'

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
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    routes,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    MemberService,
    ApiService,
    AppComponent,
    AuthGuard,
    IsLoggedInGuard,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorServiceService, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService, }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
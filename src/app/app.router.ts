import {ModuleWithProviders} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import { HomepageComponent } from './homepage/homepage.component';
import { AffiliateComponent } from './affiliate/affiliate.component';
import { AgreementsComponent } from './signup/agreements/agreements.component'
import { AccountInfoComponent } from './signup/account-info/account-info.component';
import { ContributionComponent } from './signup/contribution/contribution.component';
import { IdentificationComponent } from './signup/identification/identification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PasswordComponent } from './password/password.component';

import { AuthGuard } from './shared/guards/auth.guard'
import { IsLoggedInGuard } from './shared/guards/is-logged-in.guard'
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { DocumentsComponent } from './documents/documents.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { TextActionComponent } from './shared/common/text-action/text-action.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { TimelimeComponent } from './homepage/shared/timelime/timelime.component';
import { WireInfoComponent } from './wire-info/wire-info.component';

export const router: Routes = [

	{ path: '', component: HomepageComponent, canActivate:[IsLoggedInGuard]},
	{ path: 'login', component: LoginComponent, canActivate:[IsLoggedInGuard] },

  { path: 'affiliate', component: AffiliateComponent, canActivate:[IsLoggedInGuard]},

  { path: 'timeline', component: TimelimeComponent },

	{ path: 'signup', component: AgreementsComponent, canActivate:[IsLoggedInGuard] },
	{ path: 'signup/account', component: AccountInfoComponent, canActivate:[IsLoggedInGuard] },
	{ path: 'signup/contribution', component: ContributionComponent, canActivate:[IsLoggedInGuard] },
	{ path: 'signup/wire', component: WireInfoComponent, canActivate:[AuthGuard] },
	{ path: 'signup/identification', component: IdentificationComponent, canActivate:[IsLoggedInGuard] },

	{ path: 'password/reset', component: PasswordResetComponent, canActivate:[IsLoggedInGuard] },
	{ path: 'password/reset/checkemail', component: TextActionComponent, canActivate:[IsLoggedInGuard] },
	{ path: 'reset-password/:token', component: UpdatePasswordComponent, canActivate:[IsLoggedInGuard] },

	{ path: 'dashboard', component: DashboardComponent  },
	{ path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
	{ path: 'user/:id/password', component: PasswordComponent, canActivate: [AuthGuard] },

	{ path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
	{ path: 'user/:id/documents', component: DocumentsComponent, canActivate: [AuthGuard] },

	{ path: '**', redirectTo: '', pathMatch: 'full' }
]

export const routes:ModuleWithProviders = RouterModule.forRoot(router)

import {ModuleWithProviders} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import { HomepageComponent } from './homepage/homepage.component';
import { AgreementsComponent } from './signup/agreements/agreements.component'
import { AccountInfoComponent } from './signup/account-info/account-info.component';
import { ContributionComponent } from './signup/contribution/contribution.component';
import { IdentificationComponent } from './signup/identification/identification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PasswordComponent } from './password/password.component';

export const router: Routes = [

	{ path: '', component: HomepageComponent},
	
	{ path: 'signup', component: AgreementsComponent },
	{ path: 'signup/account', component: AccountInfoComponent },
	{ path: 'signup/contribution', component: ContributionComponent },
	{ path: 'signup/identification', component: IdentificationComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'transactions', component: TransactionsComponent },
	{ path: 'user/:id/password', component: PasswordComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' }


]

export const routes:ModuleWithProviders = RouterModule.forRoot(router)
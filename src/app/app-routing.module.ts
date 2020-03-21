import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TokenGuard } from './shared/authGuards/token.guard';
import {DashboardComponent} from './components/home/dashboard/dashboard.component';
import {CustomersComponent} from './components/home/customers/customers.component';
import {InsightsComponent} from './components/home/insights/insights.component';
import {ActionPlansComponent} from './components/home/action-plans/action-plans.component';
import {FeebackFormsComponent} from './components/home/feeback-forms/feeback-forms.component';

const routes: Routes = [

  // Landing Page
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },

  { path: 'signup', component: SignupComponent },

  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent, canActivate: [TokenGuard] },

  // { path: 'dashboard', component: DashboardComponent },

  { path: 'customers', component: CustomersComponent},

  { path: 'insights', component: InsightsComponent},

  { path: 'actionplans', component: ActionPlansComponent},

  { path: 'feedbackforms', component: FeebackFormsComponent},

  // Calender
  { path: 'dashboard', component: HomeComponent,
    children: [{ path: '', component: DashboardComponent}]
  },









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

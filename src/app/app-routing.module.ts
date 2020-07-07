import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TokenGuard } from './shared/authGuards/token.guard';
import {DashboardComponent} from './components/home/dashboard/dashboard.component';
import { EditorialComponent } from './components/home-admin/editorial/editorial.component';
import {SystemAdminDashboardComponent} from './components/home-admin/system-admin-dashboard/system-admin-dashboard.component';
import {ActionPlansComponent} from './components/home/action-plans/action-plans.component';
import {InsightsComponent} from './components/home/insights/insights.component';
import {CustomersComponent} from './components/home/customers/customers.component';
import {HomeAdminComponent} from './components/home-admin/home-admin.component';
import { SystemAdminGuard } from './shared/authGuards/systemAdmin.guard';
import { OrgAdminGuard } from './shared/authGuards/orgAdmin.guard';
import {OrgProfileComponent} from './components/home/org-profile/org-profile.component';
import {CustomerDetailsComponent} from './components/home/customer-details/customer-details.component';
import {PricingPlansComponent} from './components/home/pricing-plans/pricing-plans.component';
import {BranchPerformanceComponent} from './components/home/dashboard/branch-performance/branch-performance.component';

const routes: Routes = [

  // Landing Page
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },

  { path: 'signup', component: SignupComponent },

  { path: 'login', component: LoginComponent },

  { path: 'pricing', component: PricingPlansComponent },


  { path: 'home', component: HomeComponent, canActivate: [TokenGuard] },

  // Dashboard
  { path: 'dashboard', component: HomeComponent, canActivate: [OrgAdminGuard],
    children: [{ path: '', component: DashboardComponent}]
  },

  // Action Plans
  { path: 'action-plans', component: HomeComponent, canActivate: [OrgAdminGuard],
    children: [{ path: '', component: ActionPlansComponent}]
  },


  // Insights
  { path: 'insights', component: HomeComponent, canActivate: [OrgAdminGuard],
    children: [{ path: '', component: InsightsComponent}]
  },

  // Customers
  { path: 'customers', component: HomeComponent, canActivate: [OrgAdminGuard],
    children: [{ path: '', component: CustomersComponent}]
  },

  // Customer details
  { path: 'customer-details', component: HomeComponent, canActivate: [OrgAdminGuard],
    children: [{ path: '', component: CustomerDetailsComponent}]
  },


  // Organisation Profile
  { path: 'orgprofile', component: HomeComponent, canActivate: [OrgAdminGuard],
    children: [{ path: '', component: OrgProfileComponent}]
  },

  // Branch Performance
  { path: 'branch-performance', component: HomeComponent, canActivate: [OrgAdminGuard],
    children: [{ path: '', component: BranchPerformanceComponent}]
  },







  //Admin side routes

  // Editorial
  { path: 'editorial', component: HomeAdminComponent, canActivate: [SystemAdminGuard],
    children: [{ path: '', component: EditorialComponent}]
  },

  // System Admin Dashboard
  { path: 'admin-dashboard', component: HomeAdminComponent, canActivate: [SystemAdminGuard],
    children: [{ path: '', component: SystemAdminDashboardComponent}]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TokenGuard } from './shared/authGuards/token.guard';
import {DashboardComponent} from './components/home/dashboard/dashboard.component';
import { EditorialComponent } from './components/home/editorial/editorial.component';
import {SystemAdminDashboardComponent} from './components/home/system-admin-dashboard/system-admin-dashboard.component';

const routes: Routes = [

  // Landing Page
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },

  { path: 'signup', component: SignupComponent },

  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent, canActivate: [TokenGuard] },

  // Dashboard
  { path: 'dashboard', component: HomeComponent,
    children: [{ path: '', component: DashboardComponent}]
  },

  // Editorial
  { path: 'editorial', component: HomeComponent, canActivate: [TokenGuard],
    children: [{ path: '', component: EditorialComponent}]
  },

  // System Admin Dashboard
  { path: 'admin-dashboard', component: HomeComponent,
    children: [{ path: '', component: SystemAdminDashboardComponent}]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

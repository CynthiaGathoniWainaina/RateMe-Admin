import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TokenGuard } from './shared/authGuards/token.guard';
import {DashboardComponent} from './components/home/dashboard/dashboard.component';
import { EditorialComponent } from './components/home/editorial/editorial.component';

const routes: Routes = [

  // Landing Page
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },

  { path: 'signup', component: SignupComponent },

  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent, canActivate: [TokenGuard] },

  // Dashboard
  { path: 'dashboard', component: HomeComponent, canActivate: [TokenGuard],
    children: [{ path: '', component: DashboardComponent}]
  },

  { path: 'editorial', component: EditorialComponent, canActivate: [TokenGuard]},









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ActionPlansComponent } from './components/home/action-plans/action-plans.component';
import { CustomersComponent } from './components/home/customers/customers.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { FeebackFormsComponent } from './components/home/feeback-forms/feeback-forms.component';
import { DesignFeedbackFormsComponent } from './components/home/design-feedback-forms/design-feedback-forms.component';
import { IndustryService } from './shared/services/industry.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    ActionPlansComponent,
    CustomersComponent,
    DashboardComponent,
    FeebackFormsComponent,
    DesignFeedbackFormsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

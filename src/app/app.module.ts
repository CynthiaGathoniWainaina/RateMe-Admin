import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

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
import {ChartsModule} from 'ng2-charts';
import { EditorialComponent } from './components/home/editorial/editorial.component';
import 'hammerjs';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InterestService } from './shared/services/interest.service';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SystemAdminDashboardComponent } from './components/home/system-admin-dashboard/system-admin-dashboard.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
// import { GoogleplacesComponent } from './components/signup/googleplaces/googleplaces.component';

var config = {
  apiKey: "AIzaSyD-1G3TDGxLPVqVrfel3L2WrRuDuAtQ4KQ",
  authDomain: "rate-me-admin.firebaseapp.com",
  databaseURL: "https://rate-me-admin.firebaseio.com",
  projectId: "rate-me-admin",
  storageBucket: "rate-me-admin.appspot.com",
  messagingSenderId: "1084978010423",
  // appId: "1:1084978010423:web:dfb54bfcdc0fcc798862b2",
  // measurementId: "G-5BSB254RJH"

}



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
    DesignFeedbackFormsComponent,
    EditorialComponent,
    SystemAdminDashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTooltipModule,
    NgxSpinnerModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    }),
    FontAwesomeModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }

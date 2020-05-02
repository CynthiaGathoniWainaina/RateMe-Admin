import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faEye = faEye;

  public togglePassword = 'password';
  public showPasswordIcon;
  public hidePasswordIcon;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notification: NotificationService
  ) { }


public signInForm: FormGroup;


ngOnInit() {
  this.showPasswordIcon = false;
  this.hidePasswordIcon = true;
  this.togglePassword = 'password';

  this.signInForm = this.formBuilder.group({
    email: ['', [ Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
}


get formSignIn() {return this.signInForm.controls; }





signIn() {
  this.userService.loginUser(this.signInForm.value).subscribe(
    data => {
      localStorage.setItem('loggedInUserToken', data.token);
      localStorage.setItem('loggedInUserType', data.userType);
      this.router.navigate(['/dashboard']);
    },
    error =>  this.notification.showError(error.error.message, 'Access Denied')
  );
}

// Password Toogle Functions
showPassword() {
  this.showPasswordIcon = true;
  this.hidePasswordIcon = false;
  this.togglePassword = 'text';
}

hidePassword() {
  this.showPasswordIcon = false;
  this.hidePasswordIcon = true;
  this.togglePassword = 'password';
}




}// end of main class

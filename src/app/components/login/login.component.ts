import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }


public signInForm: FormGroup;





ngOnInit() {
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
      this.router.navigate(['/home']);
    },
    error => console.log(error.error.message)
  );
}




}// end of main class

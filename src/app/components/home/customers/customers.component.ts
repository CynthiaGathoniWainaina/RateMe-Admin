import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

}

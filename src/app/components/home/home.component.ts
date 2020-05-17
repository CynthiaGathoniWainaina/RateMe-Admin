import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import { OrgProfileService } from 'src/app/shared/services/orgProfile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private orgProfileService: OrgProfileService
  ) { }


  public loggedUserName: string;
  public sideBarStatus: boolean;

  // Active side navbar status
  public dashboardNavBarActive: boolean;
  public insightsNavBarActive: boolean;
  public customersNavBarActive: boolean;
  public actionplansNavBarActive: boolean;
  public feedbackformsNavBarActive: boolean;


  public myInterval: any;

  public MyProfile: any;


  ngOnInit() {
    this.sideBarStatus = false;
    this.myProfileFunction();

    this.myInterval = setInterval(() => {
      this.CheckActiveNavBar();
    }, 700);

  }


  myProfileFunction() {
    this.orgProfileService.getOrgProfileByUserId().subscribe(
      data => {
        this.MyProfile = data;
      }, error => console.log('Error getting profile by user Id')
    );
  }


  CheckActiveNavBar() {

    if (window.localStorage.getItem('ActiveNav') === 'dashboard') {this.dashboardNavBarActive = true; }
    if (window.localStorage.getItem('ActiveNav') === 'projects') {this.insightsNavBarActive = true; }
    if (window.localStorage.getItem('ActiveNav') === 'sales') {this.customersNavBarActive = true; }
    if (window.localStorage.getItem('ActiveNav') === 'editorial') {this.actionplansNavBarActive = true; }
    if (window.localStorage.getItem('ActiveNav') === 'users') {this.feedbackformsNavBarActive = true; }
  }

  // Toggle Sidebar
  toggleSideBar() {
    this.sideBarStatus = !this.sideBarStatus;
  }

  // Navigate
  navToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  navToCustomers() {
    this.router.navigate(['/customers']);
  }
  navToInsights() {
    this.router.navigate(['/insights']);
  }
  navToFeedbackForms() {
    this.router.navigate(['/feedbackforms']);
  }
  navToActionPlans() {
    this.router.navigate(['/actionplans']);
  }

  // Log out
  logout() {
    window.localStorage.removeItem('loggedUserToken');
    window.localStorage.removeItem('loggedUserName');
    window.localStorage.removeItem('permissionStatus');
    window.localStorage.removeItem('loggedUserID');
    this.router.navigate(['/login']);
  }

  // On Destroy
  ngOnDestroy() {
    clearInterval(this.myInterval);

  }







}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SystemAdminGuard implements CanActivate {

  constructor( private router: Router) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      if (localStorage.getItem('loggedInUserType') === 'systemAdmin') {
      return true;
      }

      this.router.navigate(['/login']);
      return false;
  }


}




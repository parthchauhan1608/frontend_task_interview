import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private JwtHelper: JwtHelperService,
    private toastr: ToastrService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isAuthenticated()) {
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }


  /**
 * @description
 * Authenticate user service for auth-guard returns true or false value.
 */
  isAuthenticated(): boolean {
    let token = window.localStorage.getItem('token');
    if (!token) {
      return false;
    }
    else {
      if (this.JwtHelper.isTokenExpired(token)) {
        this.toastr.error("session Timeout Login again");
        localStorage.removeItem('token');
        return false;
      }
      else {
        return true;
      }
    }
  }

}

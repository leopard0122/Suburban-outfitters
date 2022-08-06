import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("auth:guard", this.cookieService.check('user_token'), this.authService.currentUser)
      if(this.cookieService.check('user_token')){
        if(this.authService.currentUser.role=='admin'){
          return true;  
        }else{
          window.alert("You must be an admin to access this resource");
          return false
        }
      } else{
        return false
      }
    }
  
}

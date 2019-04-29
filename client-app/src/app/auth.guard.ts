import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthenticationService,
      private _router:Router) {

  }
  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      console.log(this._authService.loggedIn());
      return true;
    } else {
      this._router.navigate(['/']);
      return false;
    }
  }

}

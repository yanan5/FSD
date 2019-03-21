import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(
    private _authService: AuthenticationService,
    private _routeService: RouterService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._authService.isUserAuthenticated(
      this._authService.getBearerToken()
    )
    .then((authenticated) => {
      if (!authenticated) {
        this._routeService.routeToLogin();
      }
      return authenticated;
    });
  }
}

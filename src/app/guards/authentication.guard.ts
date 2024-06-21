import {inject, Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import {AuthService} from "../services/auth.service";


@Injectable({
  providedIn: "root"
})
class AuthenticationGuard {

  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated == true) {
      return true;
    } else {
      this.router.navigateByUrl("/login")
      return false;
    }
  }
}

export const isAuthenticationGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state):boolean=> {
  return inject(AuthenticationGuard).canActivate(route,state);
}

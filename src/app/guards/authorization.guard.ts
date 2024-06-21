import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
class AuthorizationGuard {

  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.roles.includes("ADMIN")) {
      return true;
    } else {
      this.router.navigateByUrl("/admin/notAuthorized")
      return false;
    }
  }
}

export const isAuthorizationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state : RouterStateSnapshot):boolean => {
  return inject(AuthorizationGuard).canActivate(route,state);
};

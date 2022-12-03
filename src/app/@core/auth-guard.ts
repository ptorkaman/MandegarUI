import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../modules/auth/services/auth.service";
import { PageLinks } from "../shared/statics/page-links";
import { SitePermissions } from "../shared/statics/SitePermissions";
import { StoreKeys } from "../shared/statics/StoreKeys";
import { StoreService } from "./services";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: StoreService,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // logged in so return true
    let tokenIsExists = this.tokenIsExists();
    let tokenHasNotExpired = this.tokenHasNotExpired();
    let isAdmin = this.isAdmin();
    let userHasPermission = this.userHasPermission(route.data.permission);

    if (tokenIsExists && tokenHasNotExpired && (isAdmin || userHasPermission)) {
      return true;
    }

    this.store.localRemoveItem(StoreKeys.TOKEN_NAME);
    this.store.localRemoveItem(StoreKeys.TOKEN_EXPIRE);
    this.store.localRemoveItem(StoreKeys.USER_AVATAR);
    this.store.localRemoveItem(StoreKeys.USER_INFO);

    // not logged in so redirect to login page with the return url and return false
    let url = `${PageLinks.Auth}/${PageLinks.Login}`;

    this.router.navigateByUrl(url);
    return false;
  }

  private tokenIsExists() {
    return this.store.localGetItem(StoreKeys.TOKEN_NAME) !== null;
  }

  private isAdmin() {
    let perms = this.authService.getUserPermissions() ?? '';
    return (
      perms?.indexOf(SitePermissions.Admin.toString()) > -1 ||
      perms?.indexOf(SitePermissions.SuperAdmin.toString()) > -1
    );
  }

  private userHasPermission(routePermission?: any): boolean {
    let perms = this.authService.getUserPermissions() ?? '';
    return perms?.indexOf(routePermission) > -1;
  }

  private tokenHasNotExpired() {
    let tokenExpireTimeString = this.store.localGetItem(StoreKeys.TOKEN_EXPIRE);
    let tokenExpireDate = new Date(tokenExpireTimeString!).getTime();
    let now = new Date().getTime();
    return now < tokenExpireDate;
  }
}

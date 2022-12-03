import { ForgetPasswordModel } from './../models/forget-password.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../../../@core/services';
import { BaseService } from '../../../@core/services/base.service';
import { ApiResult } from '../../../shared/models/api-result';
import { CurrentUser } from '../../../shared/models/currentUser.model';
import { SitePermissions } from '../../../shared/statics/SitePermissions';
import { StoreKeys } from '../../../shared/statics/StoreKeys';
import { LoginModel, ResetPasswordModel, Token } from '../models';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthService extends BaseService {

  perfixUrl = 'api/Auth/';

  currentUser: CurrentUser = new CurrentUser();

  constructor(private store: StoreService, private router: Router) {
    super();
  }

  getToken(model: LoginModel): Observable<ApiResult<Token>> {
    return this.post(`${this.perfixUrl}GetToken`, model, 'json');
  }

  logOut(): Observable<ApiResult<boolean>> {
    return this.post(`${this.perfixUrl}Logout`, {}, 'json')
  }

  forgetPassword(model: ForgetPasswordModel): Observable<ApiResult<boolean>> {
    return this.post(`${this.perfixUrl}ForgotPassword`, model, 'json')
  }

  resetPasswordCodeExists(code: string): Observable<ApiResult<boolean>> {
    return this.get(`${this.perfixUrl}ResetPasswordCodeExists`, 'json', { 'requestCode': code })
  }

  resetPassword(model: ResetPasswordModel): Observable<ApiResult<boolean>> {
    return this.post(`${this.perfixUrl}ResetPassword`, model, 'json')
  }

  getCurrentUser() {
    let token = this.store.localGetItem(StoreKeys.TOKEN_NAME);
    if (token !== null) {
      this.currentUser = JSON.parse(atob(token!.split('.')[1]));
    }
    return this.currentUser;
  }

  getUserPermissions(): string {
    let cu = this.getCurrentUser();

    return cu.Permissions!;
  }

  userHasPermission(permissions: string[]) {
    let pers = this.getUserPermissions();
    let persArray = pers.split(',');

    return (
      persArray.some((r) => permissions.indexOf(r) >= 0) ||
      persArray.some((r) => r.indexOf(SitePermissions.Admin.toString()) > -1) ||
      persArray.some((r) => r.indexOf(SitePermissions.SuperAdmin.toString()) > -1)
    );
  }

}

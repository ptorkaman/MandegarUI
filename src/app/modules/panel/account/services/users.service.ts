import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordModel } from '../../../../@theme/models/change-password.model';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { UpsertUserModel } from '../models/upsert-user.model';
import { UserFormModel } from '../models/user-form.model';
import { UsersCriteriaModel } from '../models/usersCriteria.model';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class UsersService extends BaseService {

  perfixUrl = 'api/Users/';

  constructor() {
    super();
  }

  public create(model: UpsertUserModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public getById(id: number): Observable<ApiResult<UserFormModel>> {
    return this.get(`${this.perfixUrl}UpdatePreparation`, 'json', { 'id': id });
  }

  public getAll(model: UsersCriteriaModel): Observable<ApiResult<UserFormModel>> {
    return this.get(`${this.perfixUrl}GetAll`, 'json', model);
  }

  public update(model: UpsertUserModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public changePassword(model: ChangePasswordModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}ChangePassword`, model, 'json');
  }

  public getProfile(): Observable<ApiResult<UserFormModel>> {
    return this.get(`${this.perfixUrl}GetProfile`, 'json');
  }

  public updateProfile(model: UpsertUserModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}UpdateProfile`, model, 'json');
  }

  public getUserAvatar(): Observable<ApiResult<string>> {
    return this.get(`${this.perfixUrl}GetUserAvatar`, 'json');
  }

}

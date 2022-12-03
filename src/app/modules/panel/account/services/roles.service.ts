import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { RoleModel } from '../models/role.model';
import { RolePermissionModel } from '../models/rolePermission.model';
import { RootModel } from '../models/RootModel';

@Injectable()
export class RolesService extends BaseService {

  perfixUrl = 'api/Roles/';

  constructor() {
    super();
  }

  public create(model: RoleModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: RoleModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public dataBinding(id: number): Observable<ApiResult<RolePermissionModel>> {
    return this.post(`${this.perfixUrl}UpdatePreparation`, id, 'json');
  }

  public getAllPermissions(): Observable<ApiResult<RootModel>> {
    return this.post(`${this.perfixUrl}GetAllPermissions`, {}, 'json');
  }


  public getPermissions(): Observable<ApiResult<RolePermissionModel>> {
    return this.post(`${this.perfixUrl}CreatePreparation`, {}, 'json');
  }

  public getAll(): Observable<ApiResult<Array<RoleModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }


  public getById(id: number): Observable<ApiResult<RoleModel>> {
    return this.get(`${this.perfixUrl}UpdatePreparation`, 'json', { 'id': id });
  }
}

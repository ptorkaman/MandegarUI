import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services';
import { ApiResult } from '../../../../shared/models/api-result';
import { StaffCriteria, UpsertStaffModel } from '../models';
import { StaffListModel } from '../models/staff-list.model';
import { StaffModel } from '../models/staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends BaseService {

  perfixUrl = 'api/Staff/';

  constructor() {
    super();
  }


  public getAll(model: StaffCriteria): Observable<ApiResult<StaffListModel>> {
    return this.get(`${this.perfixUrl}GetAll`, 'json', model);
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public getAllStaff(): Observable<ApiResult<Array<StaffModel>>> {
    return this.post(`${this.perfixUrl}GetAllStaff`, {}, 'json');
  }
  public getAllStuff(): Observable<ApiResult<Array<StaffModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }
  public getAllStaffBaseInfo(): Observable<ApiResult<Array<StaffModel>>> {
    return this.post(`${this.perfixUrl}GetAllStaffBaseInfo`, {}, 'json');
  }
  public create(model: UpsertStaffModel): Observable<ApiResult<number>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public update(model: UpsertStaffModel): Observable<ApiResult<number>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getById(id: number): Observable<ApiResult<UpsertStaffModel>> {
    return this.get(`${this.perfixUrl}Get`, 'json', { 'id': id });
  }

  public existsStff(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}ExistsStaff`, id, 'json');
  }

  public UpdatePreparation(id: number): Observable<ApiResult<StaffModel>> {
    return this.post(`${this.perfixUrl}UpdatePreparation`, id , 'json');
  }

}

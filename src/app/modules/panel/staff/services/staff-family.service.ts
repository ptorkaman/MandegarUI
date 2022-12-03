import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services';
import { ApiResult } from '../../../../shared/models/api-result';
import { StaffFamilyInformationModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StaffFamilyService extends BaseService {

  perfixUrl = 'api/StaffFamilyInformation/';

  constructor() {
    super();
  }

  public getAll(staffId: number): Observable<ApiResult<StaffFamilyInformationModel[]>> {
    return this.get(`${this.perfixUrl}GetAll`, 'json', { 'staffId': staffId });
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public create(model: StaffFamilyInformationModel): Observable<ApiResult<boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public update(model: StaffFamilyInformationModel): Observable<ApiResult<boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getById(id: number): Observable<ApiResult<StaffFamilyInformationModel>> {
    return this.get(`${this.perfixUrl}Get`, 'json', { 'id': id });
  }

}

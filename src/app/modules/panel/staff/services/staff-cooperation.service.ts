import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from '../../../../shared/models/api-result';
import { BaseService } from '../../../../@core/services';
import { StaffCooperationModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StaffCooperationService extends BaseService {
  perfixUrl = 'api/Cooperation/';

  constructor() {
    super();
  }

  public getById(staffId: number): Observable<ApiResult<StaffCooperationModel>> {
    return this.get(`${this.perfixUrl}Get`, 'json', { 'staffId': staffId });
  }

  public update(model: StaffCooperationModel): Observable<ApiResult<boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from '../../../../shared/models/api-result';
import { BaseService } from '../../../../@core/services';
import { StaffSacrificeModel } from '../models/staff-sacrifice.model';

@Injectable({
  providedIn: 'root'
})
export class StaffSacrificeService extends BaseService {
  perfixUrl = 'api/Sacrifice/';

  constructor() {
    super();
  }

  public getById(staffId: number): Observable<ApiResult<StaffSacrificeModel>> {
    return this.get(`${this.perfixUrl}Get`, 'json', { 'staffId': staffId });
  }

  public update(model: StaffSacrificeModel): Observable<ApiResult<boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }
}

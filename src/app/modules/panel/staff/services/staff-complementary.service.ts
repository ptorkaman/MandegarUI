import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from '../../../../shared/models/api-result';
import { BaseService } from '../../../../@core/services';
import { StaffComplementaryModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StaffComplementaryService extends BaseService {
  perfixUrl = 'api/StaffComplementary/';

  constructor() {
    super();
  }

  public getById(staffId: number): Observable<ApiResult<StaffComplementaryModel>> {
    return this.get(`${this.perfixUrl}Get`, 'json', { 'staffId': staffId });
  }

  public update(model: StaffComplementaryModel): Observable<ApiResult<boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }
}

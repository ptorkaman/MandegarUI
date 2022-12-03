import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from '../../../../../app/shared/models/api-result';
import { BaseService } from '../../../../../app/@core/services';
import { StaffAddressModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StaffAddressService extends BaseService {
  perfixUrl = 'api/StaffAddress/';

  constructor() {
    super();
  }

  public getById(staffId: number): Observable<ApiResult<StaffAddressModel>> {
    return this.get(`${this.perfixUrl}Get`, 'json', { 'staffId': staffId });
  }

  public update(model: StaffAddressModel): Observable<ApiResult<boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }
}

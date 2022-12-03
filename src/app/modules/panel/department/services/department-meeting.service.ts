import { Collection } from './../../../../shared/models/collection';
import { BaseService } from './../../../../@core/services/base.service';
import { ApiResult } from './../../../../shared/models/api-result';
import { DepartmentMeetingModel } from './../models/department-meeting-model';
import { DepartmentMeetingCriteriaModel } from './../models/department-meeting-criteria-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DepartmentMeetingService extends BaseService {

  perfixUrl = 'api/DepartmentMeeting/';
  constructor() {
    super();
  }

  public getAll(model: DepartmentMeetingCriteriaModel): Observable<ApiResult<DepartmentMeetingModel>> {
    return this.get(`${this.perfixUrl}GetAll`, 'json', model);
  }

  public create(model: DepartmentMeetingModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public getById(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Get`, id, 'json');
  }

  public update(model: DepartmentMeetingModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public deleteById(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public collection(): Observable<ApiResult<Array<Collection>>> {
    return this.post(`${this.perfixUrl}Collection`, {}, 'json');
  }

}

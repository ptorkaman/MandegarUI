import { Collection } from './../../../../shared/models/collection';
import { ApiResult } from '../../../../shared/models/api-result';
import { BaseService } from '../../../../@core/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentMeetingAttendeesSearchVM } from '../models/department-meeting-attendees-Criteria.model';
import { DepartmentMeetingAttendeesResultVM } from '../models/department-meeting-attendeesResult.model';
import { DepartmentMeetingAttendeesVM } from '../models/department-meeting-attendees.model';

@Injectable()
export class DepartmentMeetingAttendeesService extends BaseService {
  perfixUrl = 'api/DepartmentMeetingAttendees/';
  constructor() {
    super();
  }


  public getAll(model: DepartmentMeetingAttendeesSearchVM): Observable<ApiResult<DepartmentMeetingAttendeesResultVM>> {
    return this.get(`${this.perfixUrl}GetAll`, 'json', model);
  }

  public deleteById(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public create(model: DepartmentMeetingAttendeesVM): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public getById(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Get`, id, 'json');
  }

  public getAllMembers(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}GetAllMembers`, id, 'json');
  }

  public update(model: DepartmentMeetingAttendeesVM): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public collection(id?:number): Observable<ApiResult<Array<Collection>>> {
    return this.post(`${this.perfixUrl}Collection`,id, 'json');
  }

}

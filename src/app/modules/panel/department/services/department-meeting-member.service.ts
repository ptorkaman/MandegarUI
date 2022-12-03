import { Collection } from '../../../../shared/models/collection';
import { ApiResult } from '../../../../shared/models/api-result';
import { BaseService } from '../../../../@core/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberCriteriaModel } from '../models/member-criteria.model';
import { DepartmentMeetingMemberModel } from '../models/department-meeting-member-model';

@Injectable()
export class DepartmentMeetingMemberService extends BaseService {
  perfixUrl = 'api/DepartmentMeetingMember/';
  constructor() {
    super();
  }

  public collection(id?: number): Observable<ApiResult<Array<Collection>>> {
    return this.post(`${this.perfixUrl}Collection`,id, 'json');
  }

  public getAll(model: MemberCriteriaModel): Observable<ApiResult<DepartmentMeetingMemberModel>> {
    return this.get(`${this.perfixUrl}GetAll`, 'json', model);
  }

  public deleteById(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public create(model: DepartmentMeetingMemberModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public getById(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Get`, id, 'json');
  }

  public getAllMembers(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}GetAllMembers`, id, 'json');
  }

  public update(model: DepartmentMeetingMemberModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

}

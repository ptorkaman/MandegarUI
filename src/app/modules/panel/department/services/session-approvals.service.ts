import { ApiResult } from './../../../../shared/models/api-result';
import { BaseService } from './../../../../@core/services/base.service';
import { Injectable } from '@angular/core';
import { SessionApprovalsCriteriaModel } from '../models/Session-approvals-criteria.model';
import { SessionApprovalsResultModel } from '../models/session-approvals-result.model';
import { Observable } from 'rxjs';
import { SessionApprovalModel } from '../models/session-approvals.model';

@Injectable({
  providedIn: 'root'
})
export class SessionApprovalsService extends BaseService {

  perfixUrl = 'api/SessionApprovals/';

  constructor() {
    super();
  }

  public getAll(model: SessionApprovalsCriteriaModel): Observable<ApiResult<SessionApprovalsResultModel>> {
    return this.get(`${this.perfixUrl}GetAll`, 'json', model);
  }

  public create(model: SessionApprovalModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public getById(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Get`, id, 'json');
  }

  public update(model: SessionApprovalModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public deleteById(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public getAllMembers(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}GetAllMembers`, id, 'json');
  }

}

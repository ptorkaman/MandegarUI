import { ApiResult } from './../../../../shared/models/api-result';
import { BaseService } from './../../../../@core/services/base.service';
import { Injectable } from '@angular/core';
import { EvaluationGroupModel } from '../models/evaluation-group.model';
import { Observable } from 'rxjs';
import { EvaluationGroupCriteriaModel } from '../models/evaluation-group-criteria.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationGroupService extends BaseService {

  perfixUrl = 'api/EvaluationGroup/';

  constructor() {
    super();
  }

  public create(model: EvaluationGroupModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: EvaluationGroupModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(model:EvaluationGroupCriteriaModel): Observable<ApiResult<Array<EvaluationGroupModel>>> {
    return this.get(`${this.perfixUrl}GetAll`,'json',model);
  }

  public getById(id: number): Observable<ApiResult<EvaluationGroupModel>> {
    return this.post(`${this.perfixUrl}Get`, id, 'json');
  }

}

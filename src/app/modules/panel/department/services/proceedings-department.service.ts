import { ProceedingDepartmentModel } from './../models/proceeding-department-model';
import { ApiResult } from './../../../../shared/models/api-result';
import { BaseService } from './../../../../@core/services/base.service';
import { Injectable } from '@angular/core';
import { ProceedingDepartmentCriteriaModel } from '../models/proceeding-department-criteria-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProceedingsDepartmentService extends BaseService {

  perfixUrl = 'api/ProceedingsDepartment/';

  constructor() {
    super();
  }

  public getAll(model: ProceedingDepartmentCriteriaModel): Observable<ApiResult<ProceedingDepartmentModel>> {
    return this.get(`${this.perfixUrl}GetAll`, 'json', model);
  }

  public create(model: ProceedingDepartmentModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public getById(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Get`, id, 'json');
  }

  public update(model: ProceedingDepartmentModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public deleteById(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

}

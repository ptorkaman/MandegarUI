import { ApiResult } from './../../../../shared/models/api-result';
import { BaseService } from './../../../../@core/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleModel } from '../models/schedule.model';
import { DepartmentScheduleModel } from '../models/department-schedule.model';
import { DepartmentScheduleCriteriaModel } from '../models/department-schedule-criteria-model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentScheduleService extends BaseService {
  perfixUrl = 'api/DepartmentSchedule/';
constructor() {
  super();
}
  public getAll(): Observable<ApiResult<Array<ScheduleModel>>> {
    return this.post(`${this.perfixUrl}Collection`, {}, 'json');
  }

  public create(model: DepartmentScheduleModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: DepartmentScheduleModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAllDepartmentSchedule(model: DepartmentScheduleCriteriaModel): Observable<ApiResult<Array<DepartmentScheduleModel>>> {
    return this.get(`${this.perfixUrl}GetAll`,  'json',model);

  }


  public getById(id: number): Observable<ApiResult<DepartmentScheduleModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { DepartmentActivityTypeModel } from '../models/department-activity-type.model';



@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DepartmentActivityTypeService extends BaseService {

  perfixUrl = 'api/DepartmentActivityType/';

  constructor() {
    super();
  }

  public create(model: DepartmentActivityTypeModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: DepartmentActivityTypeModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<DepartmentActivityTypeModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }

  public getById(id: number): Observable<ApiResult<DepartmentActivityTypeModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

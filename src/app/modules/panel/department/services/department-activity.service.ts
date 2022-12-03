import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { DepartmentActivityModel } from '../models/department-activity.model';


@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DepartmentActivityService extends BaseService {

  perfixUrl = 'api/DepartmentActivity/';

  constructor() {
    super();
  }

  public create(model: DepartmentActivityModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: DepartmentActivityModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<DepartmentActivityModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }


  public getById(id: number): Observable<ApiResult<DepartmentActivityModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { DepartmentModel } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DepartmentService extends BaseService {

  perfixUrl = 'api/Department/';

  constructor() {
    super();
  }

  public create(model: DepartmentModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: DepartmentModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<DepartmentModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }

  public getById(id: number): Observable<ApiResult<DepartmentModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

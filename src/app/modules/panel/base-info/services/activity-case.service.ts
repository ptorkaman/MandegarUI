import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { ActivityCaseModel } from '../models/Activity-case.model';



@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ActivityCaseService extends BaseService {

  perfixUrl = 'api/ActivityCase/';

  constructor() {
    super();
  }

  public create(model: ActivityCaseModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: ActivityCaseModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<ActivityCaseModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }

  public getById(id: number): Observable<ApiResult<ActivityCaseModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

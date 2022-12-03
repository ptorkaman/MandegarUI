import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { RootModel } from '../../account/models/RootModel';
import { AssignTaskModel } from '../models/assign-task.model';


@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AssignTaskService extends BaseService {


  perfixUrl = 'api/AssignTask/';

  constructor() {
    super();
  }

  public create(model: AssignTaskModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: AssignTaskModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<AssignTaskModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }


  public getById(id: number): Observable<ApiResult<AssignTaskModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }
  public getAllTasks(): Observable<ApiResult<RootModel>> {
    return this.post(`${this.perfixUrl}GetAllTasks`, {}, 'json');
  }
  public getAllByPositionId(id: number): Observable<ApiResult<Array<AssignTaskModel>>> {
    return this.post(`${this.perfixUrl}GetAllByPositionId`, id, 'json');
  }

}

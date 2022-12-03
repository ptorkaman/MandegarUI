import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { TaskGroupModel } from '../models/task-group.model';



@Injectable({
  providedIn: 'root'
})
@Injectable()
export class TaskGroupService extends BaseService {

  perfixUrl = 'api/TaskGroup/';

  constructor() {
    super();
  }

  public create(model: TaskGroupModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: TaskGroupModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<TaskGroupModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }

  public getById(id: number): Observable<ApiResult<TaskGroupModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

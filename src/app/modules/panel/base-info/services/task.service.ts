import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { TaskModel } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
@Injectable()
export class TaskService extends BaseService {


  perfixUrl = 'api/Task/';

  constructor() {
    super();
  }

  public create(model: TaskModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: TaskModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<TaskModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }


  public getById(id: number): Observable<ApiResult<TaskModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }
  GetAllByTaskGroupId(id: number) : Observable<ApiResult<Array<TaskModel>>> {
    return this.post(`${this.perfixUrl}GetAllByTaskGroupId`, id, 'json');
  }
}

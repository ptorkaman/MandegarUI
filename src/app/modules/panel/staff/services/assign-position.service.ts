import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from '../../../../shared/models/api-result';
import { BaseService } from '../../../../@core/services';
import { AssignPositionModel } from '../models/assign-position.model';
import { RootModel } from '../../account/models/RootModel';

@Injectable({
  providedIn: 'root'
})
export class AssignPositionService extends BaseService {
  perfixUrl = 'api/AssignPosition/';

  constructor() {
    super();
  }

  public create(model: AssignPositionModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: AssignPositionModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<AssignPositionModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }


  public getById(id: number): Observable<ApiResult<AssignPositionModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }
  public getAllPositions(): Observable<ApiResult<RootModel>> {
    return this.post(`${this.perfixUrl}GetAllPositions`, {}, 'json');
  }
}

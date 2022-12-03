import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { RootModel } from '../../account/models/RootModel';
import { PositionModel } from '../models/position.model';


@Injectable({
  providedIn: 'root'
})
@Injectable()
export class PositionService extends BaseService {

  perfixUrl = 'api/Position/';

  constructor() {
    super();
  }

  public create(model: PositionModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: PositionModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<PositionModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }


  public getById(id: number): Observable<ApiResult<PositionModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

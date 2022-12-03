import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { CooperationTypeModel } from '../models/cooperation-type.model';



@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CooperationTypeService extends BaseService {

  perfixUrl = 'api/CooperationType/';

  constructor() {
    super();
  }

  public create(model: CooperationTypeModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: CooperationTypeModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<CooperationTypeModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }

  public getById(id: number): Observable<ApiResult<CooperationTypeModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

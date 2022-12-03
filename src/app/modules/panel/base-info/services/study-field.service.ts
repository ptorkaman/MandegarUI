import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { StudyFieldModel } from '../models/study-field.model';



@Injectable({
  providedIn: 'root'
})
@Injectable()
export class StudyFieldService extends BaseService {

  perfixUrl = 'api/StudyField/';

  constructor() {
    super();
  }

  public create(model: StudyFieldModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: StudyFieldModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<StudyFieldModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }

  public getById(id: number): Observable<ApiResult<StudyFieldModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

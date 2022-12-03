import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { LessonTypeModel } from '../models/lesson-type.model';



@Injectable({
  providedIn: 'root'
})
@Injectable()
export class LessonTypeService extends BaseService {

  perfixUrl = 'api/LessonType/';

  constructor() {
    super();
  }

  public create(model: LessonTypeModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: LessonTypeModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<LessonTypeModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }

  public getById(id: number): Observable<ApiResult<LessonTypeModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

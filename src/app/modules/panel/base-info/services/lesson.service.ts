import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { LessonModel } from '../models/lesson.model';



@Injectable({
  providedIn: 'root'
})
@Injectable()
export class LessonService extends BaseService {

  perfixUrl = 'api/Lesson/';

  constructor() {
    super();
  }

  public create(model: LessonModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: LessonModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<LessonModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }

  public getById(id: number): Observable<ApiResult<LessonModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

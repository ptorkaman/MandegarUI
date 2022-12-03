import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { DepartmentLessonModel } from '../models/department-lesson.model';



@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DepartmentLessonService extends BaseService {

  perfixUrl = 'api/DepartmentLesson/';

  constructor() {
    super();
  }

  public create(model: DepartmentLessonModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: DepartmentLessonModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<DepartmentLessonModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }

  public getById(id: number): Observable<ApiResult<DepartmentLessonModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

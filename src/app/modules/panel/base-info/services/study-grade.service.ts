import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { StudyGradeModel } from '../models/study-grade.model';



@Injectable({
  providedIn: 'root'
})
@Injectable()
export class StudyGradeService extends BaseService {

  perfixUrl = 'api/StudyGrade/';

  constructor() {
    super();
  }

  public create(model: StudyGradeModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: StudyGradeModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<StudyGradeModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }

  public getById(id: number): Observable<ApiResult<StudyGradeModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { StudyDegreeModel } from '../models/study-degree.model';



@Injectable({
  providedIn: 'root'
})
@Injectable()
export class StudyDegreeService extends BaseService {

  perfixUrl = 'api/StudyDegree/';

  constructor() {
    super();
  }

  public create(model: StudyDegreeModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: StudyDegreeModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<StudyDegreeModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }

  public getById(id: number): Observable<ApiResult<StudyDegreeModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

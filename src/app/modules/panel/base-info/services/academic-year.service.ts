import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { AcademicYearModel } from '../models/academic-year.model';



@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AcademicYearService extends BaseService {

  perfixUrl = 'api/AcademicYear/';

  constructor() {
    super();
  }

  public create(model: AcademicYearModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: AcademicYearModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<AcademicYearModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }

  public getById(id: number): Observable<ApiResult<AcademicYearModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

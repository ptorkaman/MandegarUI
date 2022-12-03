import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { ExecutiveCalendarModel } from '../models/executive-calendar.model';


@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ExecutiveCalendarService extends BaseService {

  perfixUrl = 'api/ExecutiveCalendar/';

  constructor() {
    super();
  }

  public create(model: ExecutiveCalendarModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: ExecutiveCalendarModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<ExecutiveCalendarModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }


  public getById(id: number): Observable<ApiResult<ExecutiveCalendarModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../@core/services/base.service';
import { ApiResult } from '../../../../shared/models/api-result';
import { DepartmentMemberModel } from '../models/department-member.model';



@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DepartmentMemberService extends BaseService {

  perfixUrl = 'api/DepartmentMember/';

  constructor() {
    super();
  }

  public create(model: DepartmentMemberModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Add`, model, 'json');
  }

  public deletebyId(id: number): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Delete`, id, 'json');
  }

  public edit(model: DepartmentMemberModel): Observable<ApiResult<Boolean>> {
    return this.post(`${this.perfixUrl}Update`, model, 'json');
  }

  public getAll(): Observable<ApiResult<Array<DepartmentMemberModel>>> {
    return this.post(`${this.perfixUrl}GetAll`, {}, 'json');
  }

  public getById(id: number): Observable<ApiResult<DepartmentMemberModel>> {
    return this.post(`${this.perfixUrl}GetById`, id, 'json');
  }

}

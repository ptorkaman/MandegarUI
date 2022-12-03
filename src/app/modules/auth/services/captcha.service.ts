import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../@core/services/base.service';
import { ApiResult } from '../../../shared/models/api-result';
import { CaptchaModel } from '../models';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CaptchaService extends BaseService {

  perfixUrl = 'api/Captcha/';

  constructor() {
    super();
  }

  public create(): Observable<CaptchaModel> {
    return this.get(`${this.perfixUrl}Create`, 'json');
  }

}

import { Injectable } from '@angular/core';
import { StoreKeys } from '../../shared/statics/StoreKeys';

@Injectable()
export class JwtService {
  getToken(): String {
    return window.localStorage[StoreKeys.TOKEN_NAME];
  }

  saveToken(token: String) {
    window.localStorage[StoreKeys.TOKEN_NAME] = token;
  }

  destroyToken() {
    window.localStorage.removeItem(StoreKeys.TOKEN_NAME);
  }
}

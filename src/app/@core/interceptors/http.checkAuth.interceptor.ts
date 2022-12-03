import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PageLinks } from '../../shared/statics/page-links';
import { StoreService } from '../services';
import { StoreKeys } from '../../shared/statics/StoreKeys';

@Injectable()
export class HttpCheckAuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,
    private store: StoreService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.

    const authReq = req.clone();
    // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
    return next
      .handle(authReq)
      .pipe(catchError((x) => this.handleAuthError(x))); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      //navigate /delete cookies or whatever
      this.store.localRemoveItem(StoreKeys.TOKEN_NAME);
      this.store.localRemoveItem(StoreKeys.TOKEN_EXPIRE);
      this.store.localRemoveItem(StoreKeys.USER_AVATAR);
      this.store.localRemoveItem(StoreKeys.USER_INFO);

      this.router.navigateByUrl(`${PageLinks.Auth}/${PageLinks.Login}`);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }


}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Global } from '../app-global';
import * as MD5 from 'js-md5';

interface CacheData<T> {
  expireAt: number;
  data: T;
}

export class BaseService {
  public http: HttpClient;

  private version: string;
  private apiVersion: string;

  constructor(private baseUrl: string = environment.apiUrl) {
    this.http = Global.Injector.get(HttpClient);

    this.version = environment.version.split('.').join('');
  }

  protected get<T>(
    path: string,
    type: 'arraybuffer',
    params?: any,
    cache?: boolean,
    timeout?: number
  ): Observable<ArrayBuffer>;
  protected get<T>(
    path: string,
    type: 'blob',
    params?: any,
    cache?: boolean,
    timeout?: number
  ): Observable<Blob>;
  protected get<T>(
    path: string,
    type: 'text',
    params?: any,
    cache?: boolean,
    timeout?: number
  ): Observable<string>;
  protected get<T>(
    path: string,
    type: 'json',
    params?: any,
    cache?: boolean,
    timeout?: number
  ): Observable<T>;
  protected get<T>(
    path: string,
    type: any,
    params?: any,
    cache?: any,
    timeout?: number
  ): any {
    const isCache: boolean = typeof cache !== 'undefined' && cache;

    let key: string = '';
    if (isCache) {
      if (typeof timeout === 'undefined') {
        timeout = 10;
      }
      key = `${this.baseUrl + path}${type}${JSON.stringify(params)}`;
      key = MD5(key);

      const data: any = this.getCacheStorage().getItem(key);
      if (data) {
        try {
          const response: CacheData<T> = JSON.parse(
            decodeURIComponent(atob(data))
          );
          const cDate: Date = new Date();
          const eDate: any = response.expireAt;
          if (eDate === -1 || eDate > cDate) {
            return of<T>(response.data);
          } else {
            this.getCacheStorage().removeItem(key);
          }
        } catch (e) { }
      }
    }

    return this.http
      .get<T>(this.baseUrl + path, {
        params: this.getHttpParams(params),
        responseType: type,
      })
      .pipe(
        tap((response) => {
          if (isCache) {
            let exp: number = -1;
            const now: Date = new Date();
            if (timeout !== -1) {
              exp = now.setMinutes(now.getMinutes() + Number(timeout));
            }
            const data: CacheData<T> = {
              expireAt: exp,
              data: response,
            };
            this.getCacheStorage().setItem(
              key,
              btoa(encodeURIComponent(JSON.stringify(data)))
            );
            // if (timeout !== -1) {
            //     setTimeout(() => {
            //         this.getCacheStorage().removeItem(key);
            //     // }, timeout * 60000);
            //     }, timeout);
            // }
          }
        })
      );
  }

  protected post<T>(
    path: string,
    body: T,
    type: 'arraybuffer',
    params?: any
  ): Observable<ArrayBuffer>;
  protected post<T>(
    path: string,
    body: T,
    type: 'blob',
    params?: any
  ): Observable<Blob>;
  protected post<T>(
    path: string,
    body: T,
    type: 'text',
    params?: any
  ): Observable<string>;
  protected post<T, U>(
    path: string,
    body: T,
    type?: 'json',
    params?: any
  ): Observable<U>;
  protected post<T, U>(
    path: string,
    body: T,
    type: 'formData',
    params?: any
  ): Observable<any>;
  protected post<T, U>(
    path: string,
    body: T,
    type: any,
    params?: any
  ): Observable<U> {
    if (type === 'formData') {
      let httpOptions = {
        headers: new HttpHeaders({
          meta: 'skipJson',
        }),
      };

      const headers = new HttpHeaders();
      headers.append('meta', 'skipJson');
      return this.http.post<U>(
        this.baseUrl + path,
        this.removeNulls<T>(body),
        httpOptions
      );
    } else {
      return this.http.post<U>(this.baseUrl + path, this.removeNulls<T>(body), {
        params: this.getHttpParams(params),
        responseType: type,
      });
    }
  }

  protected put<T>(
    path: string,
    body: T,
    type: 'arraybuffer',
    params?: any
  ): Observable<ArrayBuffer>;
  protected put<T>(
    path: string,
    body: T,
    type: 'blob',
    params?: any
  ): Observable<Blob>;
  protected put<T>(
    path: string,
    body: T,
    type: 'text',
    params?: any
  ): Observable<string>;
  protected put<T, U>(
    path: string,
    body: T,
    type: 'json',
    params?: any
  ): Observable<U>;
  protected put<T, U>(
    path: string,
    body: T,
    type: any,
    params?: any
  ): Observable<U> {
    return this.http.put<U>(this.baseUrl + path, this.removeNulls<T>(body), {
      params: this.getHttpParams(params),
      responseType: type,
    });
  }

  protected delete(
    path: string,
    type: 'arraybuffer',
    params?: any
  ): Observable<ArrayBuffer>;
  protected delete(path: string, type: 'blob', params?: any): Observable<Blob>;
  protected delete(
    path: string,
    type: 'text',
    params?: any
  ): Observable<string>;
  protected delete<T>(path: string, type: 'json', params?: any): Observable<T>;
  protected delete<T>(path: string, type: any, params?: any): Observable<T> {
    return this.http.delete<T>(this.baseUrl + path, {
      params: this.getHttpParams(params),
      responseType: type,
    });
  }

  protected head(path: string, params?: any): Observable<any> {
    return this.http.head(this.baseUrl + path, {
      params: this.getHttpParams(params),
    });
  }

  protected fetchLocal<T>(path: string, type: 'text'): Observable<string>;
  protected fetchLocal<T>(path: string, type: 'json'): Observable<T>;
  protected fetchLocal<T>(path: string, type: any): any {
    return this.http.get<T>(path + `?v=${this.version}`, {
      responseType: type,
    });
  }

  protected queryStringBuilder(
    path: string,
    params: any,
    baseUrl: string = this.baseUrl
  ): string {
    let queryString: string = '';

    if (params && Object.keys(params).length > 0) {
      queryString =
        '?' +
        Object.keys(params)
          .map((key) => key + '=' + params[key])
          .join('&');
    }

    return baseUrl + path + queryString;
  }

  protected getUrlVars<T>(url: string): T {
    const vars: any = {};
    (url as any).replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      (m: any, key: string | number, value: string) => {
        vars[key] = decodeURI(value);
      }
    );

    return vars;
  }

  protected getFormData(model: any, files: FileList): FormData {
    const formData: FormData = new FormData();
    // if (files) {
    //     for (let i = 0; i < files.length; i++) {
    //         formData.append('file', files[i], files[i].name);
    //     }
    // }
    // Object.keys(model).forEach(key => { formData.append(key, model[key]); });

    return formData;
  }

  private getHttpParams(params: any): HttpParams {
    let httpParams: HttpParams = new HttpParams();

    if (params) {
      let temp: any = null;
      temp = {};
      Object.keys(params).reduce((previousValue, currentValue) => {
        if (params[currentValue] != null) {
          previousValue[currentValue] = params[currentValue];
        } else {
          previousValue[currentValue] = '';
        }

        return previousValue;
      }, temp);
      Object.keys(temp).map((x) => {
        httpParams = httpParams.set(x, temp[x]);
      });
    }

    return httpParams;
  }

  private removeNulls<T>(val: T): any {
    let model: any;
    model = val;
    Object.keys(model).forEach(
      (k) =>
        (model[k] &&
          typeof model[k] === 'object' &&
          this.removeNulls(model[k])) ||
        (!model[k] &&
          model[k] !== undefined &&
          model[k] !== 0 &&
          model[k] !== false &&
          delete model[k])
    );

    model = this.trimStringProps(model);

    return model;
  }

  private trimStringProps(model: any): any {
    for (const property in model) {
      if (model[property]) {
        let value = model[property];
        if (typeof value === 'string') model[property] = value.trim();
      }
    }

    return model;
  }

  private getCacheStorage(): Storage {
    return window.sessionStorage;
  }

  postFile(file: File, path: string): any {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.baseUrl + path, formData);
  }

  postFiles(files: File[]): any {
    let filesToUpload: File[] = files;
    const formData: FormData = new FormData();

    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });

    return this.http.post(
      this.baseUrl + 'Api/Attachment/UploadMultiple',
      formData,
      { reportProgress: true, observe: 'events' }
    );
  }

}

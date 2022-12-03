import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  localSetItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  localGetItem(key: string) {
    return localStorage.getItem(key);
  }

  localRemoveItem(key: string) {
    return localStorage.removeItem(key);
  }

  sessionSetItem(key: string, value: string) {
    return sessionStorage.setItem(key, value);
  }

  sessionGetItem(key: string) {
    return sessionStorage.getItem(key);
  }

  sessionRemoveItem(key: string) {
    return sessionStorage.removeItem(key);
  }
}

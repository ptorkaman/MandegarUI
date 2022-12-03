import { InjectionToken } from '@angular/core';
import { tempReducer, tokenReducer, userInfoReducer } from './reducer';

export interface StoreData<T> {
    tokenState: T;
    userInfoState: T;
    tempState: T;
}

export const ROOT_REDUCER: InjectionToken<any> = new InjectionToken<any>('Root Reducer', {
    factory: () => ({
        tokenState: tokenReducer,
        userInfoState: userInfoReducer,
        tempState: tempReducer
    })
});

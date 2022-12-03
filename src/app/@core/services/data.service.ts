import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {

    public _subject = new Subject<object>();
    public event = this._subject.asObservable();
    public sendData(data: any) {
        this._subject.next(data);
    }

    public _subjectCreate = new Subject<object>();
    public eventCreate = this._subjectCreate.asObservable();
    public sendDataCreate(data: any) {
        this._subjectCreate.next(data);
    }

    public _subjectEdit = new Subject<object>();
    public eventEdit = this._subjectEdit.asObservable();
    public sendDataEdit(data: any) {
        this._subjectEdit.next(data);
    }

    public _subjectDirective = new Subject<object>();
    public eventDirective = this._subjectDirective.asObservable();
    public sendDataDirective(data: any) {
        this._subjectDirective.next(data);
    }

    public _disabledObject = new Subject<object>();
    public eventObject = this._disabledObject.asObservable();
    public sendDataObject(data: any) {
        this._disabledObject.next(data);
    }

}


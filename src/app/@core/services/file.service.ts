import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
// import { ReorderableColumn } from 'primeng/table';


@Injectable({
    providedIn: 'root'
})
export class FileService extends BaseService {

    constructor() {
        super();
    }

    uploadFiles(files: any): Observable<HttpEvent<any>> {
        return this.postFiles(files);
    }

    downloadFile(url: string, id: string) {
        return this.get(url, 'json', { fileId: id });
    }

}

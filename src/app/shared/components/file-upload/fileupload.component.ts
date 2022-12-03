import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileService } from '../../../../app/@core/services/file.service';
import { FileModel } from '../../models/file.model';

declare var $: any;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: { provide: any, useExisting: any, multi: any } = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FileuploadComponent),
  multi: true
};

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, FileService]
})
export class FileuploadComponent implements OnInit, ControlValueAccessor {

  uploadedFiles: any[] = [];
  progressBarIsShow = false;
  progress!: number;

  @Input() multiple: boolean = false;
  @Input() maxFileSize: number = 500000;
  @Input() accept: string = "image/*";
  @Input() downloadUrl: string = '';
  @Input() info: string = '';
  @Input() invalidFileSizeMessageSummary: string = "حجم فایل معتبر نیست";
  @Input() invalidFileSizeMessageDetail: string = "فایل باید حداکثر 500 کیلوبایت باشد";
  @Input() invalidFileTypeMessageDetail: string = "فقط امکان بارگذاری پسوندهای اعلامی وجود دارد";
  @Input() invalidFileTypeMessageSummary: string = "نوع فایل معتبر نیست";
  @Input() disabled: boolean = false;
  @Input() onlyShowFiles: boolean = false;

  private _files: any[] = [];
  get files() { return this._files };
  @Input() set files(files: FileModel[]) {
    setTimeout(() => {
      if (files && files.length != 0) {
        this.uploadedFiles = [];
        this.uploadedFiles.push(...files)
        let fileIds: any[] = [];
        Array.from(this.uploadedFiles).map((file: any, index: any) => {
          return fileIds.push(file.id);
        });
        this.writeValue(fileIds);
        this.OnUpload.next(fileIds)

      } else {
        this.writeValue([]);
      }
    }, 50);
  };

  @Output() OnUpload: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }

  onLicenceUpload(event: any, fileUpload: any) {
    this.progressBarIsShow = true;
    this.progress = 0;
    this.fileService.postFiles(event.files).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((100 * event.loaded) / event.total);
      } else if (event.type === HttpEventType.Response) {
        if (event.body && event.body.success) {
          this.progressBarIsShow = false;
          fileUpload.clear();
          if (!this.multiple) this.uploadedFiles = [];
          this.uploadedFiles.push(...event.body.data)

          let fileIds: any[] = [];
          Array.from(this.uploadedFiles).map((file, index) => {
            return fileIds.push(file.id);
          });

          this.writeValue(fileIds);
          this.OnUpload.next(fileIds)
        }
      };
    });
  }

  delete(id: any) {
    this.uploadedFiles = this.uploadedFiles.filter(x => x.id != id);

    let fileIds: any[] = [];
    Array.from(this.uploadedFiles).map((file, index) => {
      return fileIds.push(file.id);
    });
    fileIds.length == 0 ? this.writeValue([]) : this.writeValue(fileIds);
    this.OnUpload.next(fileIds)
  }

  download(id: any) {
    this.setLoading(true);
    this.fileService.downloadFile(this.downloadUrl, id).subscribe((result: any) => {
      if (result.success) {
        var a = document.createElement("a");
        a.href = "data:application/file;base64," + encodeURI(result.data.data);
        a.download = result.data.name;
        a.click();
      }
      this.setLoading(false)
    });
  }

  public setLoading(status: boolean = true): void {
    const body: any = $('body');
    if (status) {
      body.addClass('loading');
    } else {
      setTimeout(() => {
        body.removeClass('loading');
      }, 300);
    }
  }

  writeValue(value: any[]): void {
    this.onChange(value);
  }

  onChange = (_: any) => { };
  onTouched = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}

import { Component, EventEmitter, forwardRef, Injector, Input, OnInit, Output } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CaptchaService } from '../../services/captcha.service';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: { provide, useExisting, multi } = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CaptchaComponent),
  multi: true
};

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CaptchaComponent implements OnInit {

  captchaImageSrc: string;
  value: string = '';
  errorMessage: string;
  key: string;
  ngControl: NgControl;
  @Output() OnGetCaptcha: EventEmitter<string> = new EventEmitter<string>();
  @Input() reloadCaptcha;

  constructor(private injector: Injector,
    private captchaService: CaptchaService) {
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
  }


  getCaptcha() {
    this.captchaService.create().subscribe(result => {
      this.key = result.key;
      this.captchaImageSrc = `data:image/png;base64,${result.value}`;
      this.OnGetCaptcha.emit(this.key);
    })
  }

  writeValue(value: string): void {
    this.value = this.ngControl.value;
    this.onChange(value);
  }

  ngOnChanges() {
    this.getCaptcha();
  }

  changeValue(): void {

    if (!this.value) {

      this.errorMessage = 'اجباری است';

      this.getInvalidClass();
      this.ngControl.control.setErrors({ 'incorrect': true });
    }
    else {
      this.errorMessage = null;
    }
    this.onChange(this.value);
  }

  getInvalidClass() {
    if (this.ngControl) {
      return {
        'ng-invalid': this.ngControl.invalid || this.errorMessage,
        'ng-touched': this.ngControl.touched,
        'ng-dirty': this.ngControl.dirty
      };
    }
  }

  onChange = (_: any) => { };
  onTouched = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}

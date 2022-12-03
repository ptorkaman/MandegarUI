import { Component, EventEmitter, forwardRef, Injector, Input, OnInit, Output } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../../app/shared/base/base.component';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: { provide, useExisting, multi } = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SacrificeDurationComponent),
  multi: true
};

@Component({
  selector: 'app-sacrifice-duration',
  templateUrl: './sacrifice-duration.component.html',
  styleUrls: ['./sacrifice-duration.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]

})
export class SacrificeDurationComponent extends BaseComponent implements OnInit {

  @Input() disable: boolean = true;
  @Input() title: string = '';
  @Output() onSelect: EventEmitter<number> = new EventEmitter<number>();
  errorMessage: string;
  value?: number;
  year: number;
  month: number;
  day: number;

  private ngControl: NgControl;

  constructor(route: ActivatedRoute,
    private injector: Injector) {
    super(route);
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
    this.fillData();
  }

  writeValue(value: number): void {
    this.fillData();
    this.onSelect.emit(value || null);
    this.onChange(value || null);
  }

  fillData() {
    let value = this.value ? this.value : this.ngControl.value;

    if (value != null && value != 0) {

      this.year = Math.floor(value / 365);

      let yearDevideRemaining = value % 365;

      this.month = Math.floor(yearDevideRemaining / 30)

      let monthDevideRemaining = yearDevideRemaining % 30;

      this.day = monthDevideRemaining;

    }

    this.changeValue();
  }

  changeValue(): void {
    this.value = this.getValue();

    if (this.value) {
      if (this.month > 11) {
        this.errorMessage = 'ماه نمی تواند بیشتر از 11 باشد';
        this.getInvalidClass();
        this.ngControl.control.setErrors({ 'incorrect': true });
      }
      else if (this.day > 30) {
        this.errorMessage = 'روز نمی تواند بیشتر از 30 باشد';
        this.getInvalidClass();
        this.ngControl.control.setErrors({ 'incorrect': true });
      }
      else {
        this.errorMessage = null;
      }
    }
    else {
      this.errorMessage = null;
    }

    console.log(this.value)
    this.onSelect.emit(this.value || null);
    this.onChange(this.value || null);
  }

  getValue() {
    let yearToDay = isNaN(this.year) ? 0 : this.year * 365;
    let monthToDay = isNaN(this.month) ? 0 : this.month * 30;
    let day = isNaN(this.day) ? 0 : this.day * 1;
    let sum = yearToDay + monthToDay + day;

    if (sum === 0) {
      sum = null;
    }

    return sum;
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

import { Guid } from '../../functions/guid';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import IMask from 'imask';
import { distinctUntilChanged } from 'rxjs/operators';
import { DateTimeService } from '../../../@core/services/datetime.service';

declare var $: any;

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
  }]
})
export class DatePickerComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() name: string;
  @Input() placeholder: string = '';

  @Input() isGregorian: boolean = false;
  @Input() disableBeforeToday: boolean = false;
  @Input() disableAfterToday: boolean = false;

  private _disableBeforeDate = null;
  get disableBeforeDate() { return this._disableBeforeDate };
  @Input() set disableBeforeDate(val: string) {
    this._disableBeforeDate = null;
  };

  private _disableAfterDate = null;
  get disableAfterDate() { return this._disableAfterDate };
  @Input() set disableAfterDate(val: string) {
    this._disableAfterDate = null;
  };

  @Input() groupId: string = null;
  @Input() toDate: boolean = false;
  @Input() fromDate: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() modalMode: boolean = false;

  @Output() OnSelect: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('datepicker', { static: false }) datepicker: ElementRef;

  private ngControl: NgControl;
  date: string = null;
  valueP: string = null;
  init: boolean = false;
  initMask: boolean = false;
  mask: any = null;
  color = '#000';


  constructor(private changeDetectorRef: ChangeDetectorRef,
    private injector: Injector,
    private dateTimeService: DateTimeService) {
  }

  ngOnInit() {
    if (!this.name) {
      this.name = Guid.newGuid().split('-').join('');
    }

    this.ngControl = this.injector.get(NgControl);
  }

  ngAfterViewInit(): void {
    this.initDatePicker();
  }


  initDatePicker() {
    if ($(`#${this.name}`).length && !this.init) {

      $(`#${this.name}`).MdPersianDateTimePicker({
        englishNumber: true,
        targetTextSelector: `#${this.name}`,
        targetDateSelector: `#${this.name}_date`,
        trigger: 'cut',
        dateFormat: 'yyyy-MM-dd',
        selectedDate: this.value === null ? null : new Date(this.value),
        isGregorian: this.isGregorian,
        yearOffset: 10,
        enableTimePicker: false,
        disableBeforeToday: this.disableBeforeToday,
        disableAfterToday: this.disableAfterToday,
        disableBeforeDate: this._disableBeforeDate === null ? null : new Date(this._disableBeforeDate),
        disableAfterDate: this._disableAfterDate === null ? null : new Date(this._disableAfterDate),
        groupId: this.groupId,
        toDate: this.toDate,
        fromDate: this.fromDate,
        modalMode: this.modalMode,
        holiDays: []
      });

      this.valueP = $(`#${this.name}`).MdPersianDateTimePicker('getText');

      $(`#${this.name}`).on('hidden.bs.popover', () => {
        this.value = $(`#${this.name}_date`).val();
        this.changeDetectorRef.detectChanges();
      });

      // ---- Important : detect change value for parent by fire blur event ------
      this.ngControl.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe(value => {
          this.datepicker.nativeElement.focus();
          this.datepicker.nativeElement.blur();
        });
      //---------------------------------- end -----------------------------------

      this.init = true;
    }
  }

  clear(): void {
    this.value = null;
    this.OnSelect.emit(null);
    this.writeValue(null);

    $(`#${this.name}`).MdPersianDateTimePicker('clearDate');
    this.changeDetectorRef.detectChanges();
  }

  show(): void {
    $(`#${this.name}`).MdPersianDateTimePicker('show');
  }

  getDate(): void {
    this.writeValue(this.dateTimeService.getServerDateTime('YYYY-MM-DD'));
  }

  get value(): string {
    if (this.date === null || this.date === '') {
      return null;
    } else {
      return this.date.substr(0, 10).replace('/', '-');
    }
  }

  set value(value: string) {
    this.date = value;
    this.writeValue(value);
  }

  writeValue(value: string): void {
    this.initDatePicker();
    this.date = value;

    if (this.init && this.date !== null && this.date !== '') {
      $(`#${this.name}`).MdPersianDateTimePicker('setDate', new Date(this.date));
    } else {
      $(`#${this.name}`).MdPersianDateTimePicker('clearDate');
    }

    this.OnSelect.emit(this.value);
    this.onChange(this.value);
  }

  onChange = (_: any) => { };
  onTouched = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  getInvalidClass() {

    if (this.ngControl) {
      return { 'ng-invalid': this.ngControl.invalid, 'ng-touched': this.ngControl.dirty || this.ngControl.touched };
    }
  }

  onblur() {
    this.color = '#000'
    setTimeout(() => {
      this.onTouched();
      if (this.ngControl.control.value == null) {
        this.color = '#fff'
      }
    }, 0);
  }

  setDate(value) {
    this.color = '#000'
    this.setMask()
    let v = value.replace(/_/g, '')
    const chars = v.split('/');

    if (v.length == 10 && chars[0].length == 4 && chars[1].length == 2 && chars[2].length == 2) {
      let date = this.dateTimeService.toGregorian(v);
      this.writeValue(date);
    }
  }

  setMask() {
    this.mask = ($(`#${this.name}`), {
      mask: 'YYYY/MM/DD',
      lazy: false,
      blocks: {
        YYYY: {
          mask: IMask.MaskedRange,
          from: 1200,
          to: 1500
        },
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12
        },
        DD: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31
        }
      }
    });
  }

  setUnMask() {
    this.mask = ($(`#${this.name}`), {
      mask: 'YYYY/MM/DD',
      lazy: true,
      blocks: {
        YYYY: {
          mask: IMask.MaskedRange,
          from: 1200,
          to: 1500
        },
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12
        },
        DD: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31
        }
      }
    });
  }



}

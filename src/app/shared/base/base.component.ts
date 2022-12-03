import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Global } from "../../@core/app-global";
import { DateTimeService } from "../../@core/services/datetime.service";
import { ResetFormType, RxFormGroup } from '@rxweb/reactive-form-validators';
import { FormGroup } from "@angular/forms";
import * as moment from "moment";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Operators } from "../models/operators";
import { MessageService, SelectItem } from "primeng/api";
declare var $: any;

export interface Message {
  detail: string;
  summary: string;
}

export abstract class BaseComponent {
  protected router: Router;
  private translateService: TranslateService;
  private dateTimeService: DateTimeService;
  private messageService: MessageService

  allowNumberAndDashAndDot: RegExp = /^[0-9.-]+$/;
  allowNumberAndSlash: RegExp = /^[0-9\/]+$/;
  allowNumberAndDot: RegExp = /^[0-9.]+$/;
  allowNumber: RegExp = /^[0-9]+$/;
  allowNumberAndOneDot: RegExp = /^[0-9\.]+$/;
  blockSpecial: RegExp = /^[^<>*!@#$%&.+-]+$/

  arrayTemp: SelectItem[] = [];

  constructor(protected route: ActivatedRoute) {
    this.router = Global.Injector.get(Router);
    this.translateService = Global.Injector.get(TranslateService);
    this.dateTimeService = Global.Injector.get(DateTimeService);
    this.messageService = Global.Injector.get(MessageService);
  }

  get small() {
    return { '5000px': '400px', '1600px': '400px', '960px': '400px', '640px': '95vw' }
  }

  get medium() {
    return { '5000px': '850px', '1600px': '850px', '960px': '80vw', '640px': '95vw' }
  }

  get large() {
    return { '5000px': '75vw', '1600px': '80vw', '960px': '85vw', '640px': '95vw' }
  }


  public navigateTo(path: any[]) {
    this.router.navigate(path, { relativeTo: this.route })
  }

  public navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  public translate(key: string): string {
    return this.translateService.instant(key);
  }

  public setLoading(status: boolean = true): void {
    if (status) {
      document.getElementById('nb-global-spinner').style.display = 'block';
    } else {
      setTimeout(() => {
        document.getElementById('nb-global-spinner').style.display = 'none';
      }, 100);
    }
  }

  stringFormat(template: string, ...args: any[]) {
    return template.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
  };

  stringFormatWithTranslate(template: string, ...args: any[]) {
    return template.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
        ? this.translateService.instant(args[number])
        : this.translateService.instant(match)
        ;
    });
  };

  getkeyValuesByKey(data: any[], key: string) {
    let ids = [];
    if (data.length == 0) return null
    Array.from(data).map((rec, index) => {
      if (rec[key] !== null) {
        return ids.push(rec[key]);
      }
    });
    return ids;
  }

  returnHasOrNotTitle(status: boolean) {
    if (status) { return "دارد"; } else { return "ندارد" };
  }

  checkValueAndValidity(form) {
    form.markAllAsTouched();
    form.updateValueAndValidity();
  }

  toPersianDate(date) {
    return this.dateTimeService.toPersian(date);
  }

  resetForm(form: any) {
    form.reset({ resetType: ResetFormType.All });
    for (let control in form.controls) {
      form.controls[control].setErrors(null);
    }
  }

  submitForm(form: any) {
    (<RxFormGroup>form).submitted = true;
    for (let control in form.controls) {
      form.controls[control].markAsDirty();
    }
  }

  checkDateFromToValidator(form: FormGroup, dateFrom: string, dateTo: string) {
    form.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
      ).subscribe(() => {

        let dateControl1 = form.controls[dateFrom];
        let dateControl2 = form.controls[dateTo];

        dateControl1.setErrors(null);
        dateControl2.setErrors(null);

        if (dateControl1 || dateControl2) {
          if (dateControl1.value && dateControl2.value) {
            if (dateControl1.value > dateControl2.value) {
              dateControl1.setErrors({ 'dateCompareInvalid': true });
            }
            if (dateControl2.value < dateControl1.value) {
              dateControl2.setErrors({ 'dateCompareInvalid': true });
            }
          }
        }
      });
  }

  checkDateEqualValidator(form: FormGroup, dateFromControl: string, dateTo: string, operator?: Operators) {
    form.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
      ).subscribe(() => {

        let dateControl1 = form.controls[dateFromControl];
        if (dateTo) {
          dateTo = (moment(dateTo)).format('YYYY-MM-DD')
        }

        dateControl1.setErrors(null);

        if (dateControl1 || dateTo) {
          if (dateControl1.value && dateTo) {
            if (operator === Operators.Greater) {
              if (dateControl1.value <= dateTo) {
                dateControl1.setErrors({ 'dateCompareInvalid': true });
              }
            }

            if (operator === Operators.EqualGreater) {
              if (dateControl1.value < dateTo) {
                dateControl1.setErrors({ 'dateCompareInvalid': true });
              }
            }

            if (operator === Operators.Equal) {
              if (dateControl1.value !== dateTo) {
                dateControl1.setErrors({ 'dateCompareInvalid': true });
              }
            }

            if (operator === Operators.Lower) {
              if (dateControl1.value >= dateTo) {
                dateControl1.setErrors({ 'dateCompareInvalid': true });
              }
            }

            if (operator === Operators.EqualLower) {
              if (dateControl1.value > dateTo) {
                dateControl1.setErrors({ 'dateCompareInvalid': true });
              }
            }


          }
        }
      });
  }

  getRouteValue(route: ActivatedRoute, routeParam: string) {

    let paramVal = route.snapshot.paramMap.get(routeParam);

    if (paramVal === null || typeof paramVal === 'undefined')
      if (route.parent) {
        return this.getRouteValue(route.parent, routeParam);
      }
      else {
        return null;
      }

    return paramVal;

  }

  showErrorMessage(message: any) {
    this.messageService.add({ severity: 'error', summary: 'خطا', detail: message, });

  }

  showSuccessMessage(message: any) {
    this.messageService.add({ severity: 'success', summary: 'عملیات موفق', detail: message });

  }

  mapToSelectItem<T>(source: T[], label: string, value: string): SelectItem[] {
    this.arrayTemp = [];
    source.forEach(element => {
      const x: SelectItem = { label: element[label], value: element[value] };
      this.arrayTemp.push(x);
    });
    return this.arrayTemp;
  };

  mapToMultiSelectItem<T>(source: T[], name: string, code: string): SelectItem[] {
    this.arrayTemp = [];
    source.forEach(element => {
      const x: any = { name: element[name], code: element[code] };
      this.arrayTemp.push(x);
    });
    return this.arrayTemp;
  };
}

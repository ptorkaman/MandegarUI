import { AbstractControl } from '@angular/forms';
import * as moment from 'moment-jalaali';

export function PhoneValidator(err?: string) {
  return (control: AbstractControl) => {
    if (control.value == "" || (control.value && control.value.startsWith("0") && control.value.length === 11))
      return null;
    else {
      return {
        'InvalidPhone': { message: err ? err : "شماره تلفن صحیح نمی باشد" }
      };
    }
  }
}

export function MobileValidator(err?: string) {
  return (control: AbstractControl) => {
    if (control.value == "" || (control.value && control.value.startsWith("09") && control.value.length === 11))
      return null;
    else {
      return {
        'InvalidMobile': { message: err ? err : "شماره همراه صحیح نمی باشد" }
      };
    }
  }
}

export function NationalCodeValidator(err?: string) {
  return (control: AbstractControl) => {
    let nationalCode = control.value;
    let error = {
      'InvalidNationalCode': { message: err ? err : "کد ملی معتبر نمی باشد" }
    }

    if (nationalCode == "" || nationalCode == null) return null;

    if (nationalCode === "0000000000" || nationalCode === "2222222222" || nationalCode === "3333333333" || nationalCode === "4444444444" ||
      nationalCode === "5555555555" || nationalCode === "6666666666" || nationalCode === "7777777777" || nationalCode === "8888888888" || nationalCode === "9999999999") {
      return error;
    }

    if (!/^\d{10}$/.test(nationalCode)) return error;

    let check = parseInt(nationalCode[9]);
    let sum = 0;
    let i;
    for (i = 0; i < 9; ++i) {
      sum += parseInt(nationalCode[i]) * (10 - i);
    }
    sum %= 11;

    if (!((sum < 2 && check === sum) || (sum >= 2 && check + sum === 11))) return error;

    return null;
  }
}

export function AccountNumberValidator(err?: string) {
  return (control: AbstractControl) => {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    if (control.value == "" || (control.value && control.value.match(rgx)))
      return null;
    else {
      return {
        'InvalidAccountNumber': { message: err ? err : "شماره حساب صحیح نمی باشد" }
      };
    }
  }
}

export function ZipCodeValidator(err?: string) {
  return (control: AbstractControl) => {
    var rgx = /^\d{10}$/;
    if (control.value == "" || (control.value && rgx.test(control.value)))
      return null;
    else {
      return {
        'InvalidZipCode': { message: err ? err : "کد پستی صحیح نمی باشد" }
      };
    }
  }
}

export function DateValidator(err?: string) {
  return (control: AbstractControl) => {
    if (control.value == "" || (control.value && moment(control.value).isValid()))
      return null;
    else {
      return {
        'InvalidDate': { message: err ? err : "تاریخ صحیح نمی باشد" }
      };
    }
  }
}

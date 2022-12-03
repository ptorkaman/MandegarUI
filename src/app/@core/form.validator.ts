import { KeyValue } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment-jalaali';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Global } from './app-global';

declare var $: any;

export function FormValidator(formGroup: FormGroup, formId: string = '', customValidation: () => ValidationErrors = null): Observable<string[]> {
    return new Observable<string[]>(
        observer => {
            if (customValidation) {
                const err: ValidationErrors = customValidation();

                formGroup.setErrors(err);
            }

            const errors: KeyValue<string, string>[] = Array<KeyValue<string, string>>();

            if (formGroup.errors) {
                Object.keys(formGroup.errors).map(
                    err => {
                        errors.push({ key: err, value: formGroup.getError(err) });
                    }
                );
            }

            Object.keys(formGroup.controls).map(
                name => {
                    const control: FormControl = formGroup.get(name) as FormControl;

                    if (control.value) {
                        const conv: string | number = convertNumber(control.value);
                        if (control.value !== conv) {
                            control.setValue(conv);
                        }
                    }

                    if (control.errors) {
                        errors.push({ key: name, value: control.errors.error });
                    }

                    if (typeof (control as any).controls !== 'undefined') {
                        Object.keys((control as any).controls).map(
                            gName => {
                                const gControl: FormControl = control.get(gName) as FormControl;

                                const conv: string | number = convertNumber(control.value);
                                if (gControl.value !== conv) {
                                    control.setValue(conv);
                                }

                                if (gControl.errors) {
                                    errors.push({ key: gName, value: gControl.errors.error });
                                }
                            }
                        );
                    }
                }
            );

            $(`#${formId} small.err`).remove();

            const oldDiv: any = document.querySelector(`#${formId} > div.form-alert`);
            if (oldDiv) {
                oldDiv.remove();
            }

            if (errors.length < 1) {
                observer.next();
            } else {
                const translateService: TranslateService = Global.Injector.get(TranslateService);

                const result: Observable<any> = translateService.get(
                    errors.map(
                        e => {
                            return e.value;
                        }
                    )
                ).pipe(
                    map(
                        values => {
                            errors.forEach(e => { e.value = values[e.value]; });
                        }
                    ),
                    finalize(() => { showErrors(formId, errors); })
                );

                result.subscribe(() => { observer.error(errors); });
            }
        }
    );
}

function showErrors(id: string, errs: KeyValue<string, string>[]): void {
    const customErr: string[] = new Array<string>();
    for (const [i, err] of errs.entries()) {
        const elm: any = $(`#${id} [data-error="${err.key}"], #${id} [formControlName="${err.key}"]`);
        if (elm.length < 1) {
            customErr.push(err.value);
        } else {
            // $(elm[0]).addClass('invalid');
            $(`<small class="err">${err.value}</small>`).insertAfter($(elm[0]));
        }
    }

    if (errs.length > 0) {
        try {
            $('html').animate({
                scrollTop: $(`#${id} [formControlName="${errs[0].key}"]`).offset().top - 33 // 33 for visibility label
            }, 500, () => { $(`#${id} [formControlName="${errs[0].key}"]`).focus(); });
        } catch (e) {
            console.error(errs);
        }
    }

    if (customErr.length > 0) {
        addErrorsToForm(id, customErr);
    }
}

function addErrorsToForm(formId: string, errors: string[]): void {
    if (formId !== '') {
        const form: HTMLElement = document.getElementById(formId) as HTMLElement;

        const div: HTMLDivElement = document.createElement('div');
        div.classList.add('form-alert', 'alert-dismissible'); // 'alert'
        div.setAttribute('role', 'alert');

        const h6: HTMLHeadElement = document.createElement('h6');
        h6.classList.add(...['font-weight-bold', 'mb-4']);
        h6.innerHTML = '<i class="mdi mdi-alert-octagon mdi-24px"></i> موارد زیر را بررسی کنید';
        $(div).append(h6);

        const ul: HTMLUListElement = document.createElement('ul');
        errors.map(e => {
            const li: HTMLLIElement = document.createElement('li');
            li.classList.add('mb-3');
            li.innerHTML = e;

            $(ul).append(li);
        });
        $(div).append(ul);

        $(form).prepend(div);

        $('html').animate({
            scrollTop: $(`.card`).offset().top
        }, 500);
    }
}

export function ResetForm(formGroup: FormGroup, formId: string = ''): void {
    formGroup.reset();
    $(`#${formId} small.err`).remove();
}

export function AddCardLoading(className: string, btnClassName: string = null): void {
    const card: any = $(`.${className}`);
    card.addClass('loading');

    if (btnClassName) {
        $(card).find(`.${btnClassName} .mdi`).addClass('mdi-24px mdi-spin mdi-loading');
    }
}

export function RemoveCardLoading(className: string, btnClassName: string = null): void {
    const card: any = $(`.${className}`);
    setTimeout(() => {
        card.removeClass('loading');
    }, 300);

    if (btnClassName) {
        $(card).find(`.${btnClassName} .mdi`).removeClass('mdi-24px mdi-spin mdi-loading');
    }
}

export function AddCardProgress(className: string, btnClassName: string = null): void {
    const card: any = $(`.${className}.card`);
    card.addClass('progressbar');

    const overlay: HTMLDivElement = document.createElement('div');
    overlay.innerHTML = '<div class="overlay"></div>';

    const progress: HTMLDivElement = document.createElement('div');
    progress.setAttribute('class', 'card-progress');
    progress.innerHTML = '<div class="indeterminate"></div>';

    const hasModal: boolean = $(`.modal[role="dialog"]`).css('display') === 'block';
    if (hasModal) {
        $(`.modal[role="dialog"] .modal-content`).prepend(overlay).prepend(progress);
    } else {
        $(card).prepend(overlay).prepend(progress);
    }

    if (btnClassName) {
        $(card).find(`.${btnClassName} .mdi`).addClass('mdi-24px mdi-spin mdi-loading');
    }
}

export function RemoveCardProgress(className: string, btnClassName: string = null): void {
    const card: any = $(`.${className}.card`);
    setTimeout(() => {
        card.removeClass('progressbar');
    }, 300);

    const hasModal: boolean = $(`.modal[role="dialog"]`).css('display') === 'block';

    if (hasModal) {
        $(`.modal[role="dialog"] .modal-content div.overlay, .modal[role="dialog"] .modal-content div.card-progress`).remove();
    } else {
        $(card).find('div.overlay, div.card-progress').remove();
    }

    if (btnClassName) {
        $(card).find(`.${btnClassName} .mdi`).removeClass('mdi-24px mdi-spin mdi-loading');
    }
}

export function RequiredValidator(err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control.value === null || /^[\s]*$/.test(control.value)) {
            return { error: err };
        }

        return null;
    };
}

export function PhoneValidator(err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control.value === null || control.value.toString() === '') {
            return null;
        } else if (/^0\d{10}$/.test(control.value.toString())) {
            return null;
        } else {
            return { error: err };
        }
    };
}

export function MobileValidator(err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control.value === null || control.value.toString() === '') {
            return null;
        } else if (/^09\d{9}$/.test(control.value.toString())) {
            return null;
        } else {
            return { error: err };
        }
    };
}

export function NationalIdValidator(err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control.value === null || control.value.toString() === '') {
            return null;
        } else if (!/^\d{10}$/.test(control.value)
            || control.value === '0000000000'
            || control.value === '1111111111'
            || control.value === '2222222222'
            || control.value === '3333333333'
            || control.value === '4444444444'
            || control.value === '5555555555'
            || control.value === '6666666666'
            || control.value === '7777777777'
            || control.value === '8888888888'
            || control.value === '9999999999') {
            return { error: err };
        } else {
            const check: number = Number(control.value.toString()[9]);
            let sum: number = 0;
            let i: number;
            for (i = 0; i < 9; ++i) {
                sum += Number(control.value.toString()[i]) * (10 - i);
            }
            sum %= 11;
            const result: boolean = (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);

            if (result) {
                return null;
            } else {
                return { error: err };
            }
        }
    };
}

export function IsStringWithoutNumberValidator(err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (/^([^0-9]*)$/.test(control.value)) {
            return null;
        } else {
            return { error: err };
        }
    };
}

export function IsNumberValidator(err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control.value === null || control.value.toString() === '') {
            return null;
        } else if (/^\d/.test(control.value)) {
            return null;
        } else {
            return { error: err };
        }
    };
}

export function LengthValidator(len: number, err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        const regex: RegExp = new RegExp('^.{' + len + '}$');

        if (control.value === null || control.value.toString() === '') {
            return null;
        } else if (regex.test(control.value)) {
            return null;
        } else {
            return { error: err };
        }
    };
}

export function EmailValidator(err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control.value === null || control.value.toString() === '') {
            return null;
        } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)) {
            return null;
        } else {
            return { error: err };
        }
    };
}

export function UrlValidator(err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        const regex: RegExp = new RegExp(
            `^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?`
        );

        if (control.value === null || control.value.toString() === '') {
            return null;
        } else if (regex.test(control.value)) {
            return null;
        } else {
            return { error: err };
        }
    };
}

export function ZipCodeValidator(err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control.value === null || control.value.toString() === '') {
            return null;
        } else if (/^\d{10}$/.test(control.value.toString())) {
            return null;
        } else {
            return { error: err };
        }
    };
}

export function PasswordValidator(p09: boolean, az: boolean, AZ: boolean, specialChars: boolean, len: number, err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        let str: string = '';
        if (p09) {
            str += '(?=.*[0-9])';
        }
        if (az) {
            str += '(?=.*[a-z])';
        }
        if (AZ) {
            str += '(?=.*[A-Z])';
        }
        if (specialChars) {
            str += '(?=.*[!@#\$%\^&\*])';
        }
        str += `(?=.{${len},})`;

        if (new RegExp(str).test(control.value)) {
            return null;
        } else {
            return { error: err };
        }
    };
}

export function DateValidator(err: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control.value === '') {
            return null;
        }
        if (moment(control.value).isValid()) {
            return null;
        } else {
            return { error: err };
        }
    };
}

function convertNumber(val: number | string): number | string {
    const type: string = typeof val;

    if (val && (type === 'number' || type === 'string')) {
        const enNumber: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const faNumber: string[] = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const arNumber: string[] = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

        for (let i: number = 0; i < 10; i++) {
            const regex1: RegExp = new RegExp(faNumber[i], 'g');
            const regex2: RegExp = new RegExp(arNumber[i], 'g');
            val = val.toString().replace(regex1, enNumber[i]);
            val = val.toString().replace(regex2, enNumber[i]);
        }

        if (type === 'number') {
            return +val;
        } else if (type === 'string') {
            return val;
        }
    } else {
        return val;
    }
}

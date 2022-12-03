import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: 'input[appNumeric]'
})
export class NumericDirective {

    @Input() appNumeric: string;

    elm: HTMLInputElement;

    constructor(private element: ElementRef) {
        this.elm = this.element.nativeElement;

        if (this.appNumeric === '') {
            this.appNumeric = (100).toString();
        }
    }

    @HostListener('keypress', ['$event']) sanitizeValue(event: KeyboardEvent): boolean {
        const maxLen: number = +this.appNumeric;

        const value: string = this.convertNumber(this.elm.value) as string;

        if ((value && value.length >= maxLen) || !(event.keyCode >= 48 && event.keyCode <= 57)) {
            return false;
        }
    }

    private convertNumber(val: number | string): number | string {
        if (val) {
            const enNumber: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            const faNumber: string[] = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            const arNumber: string[] = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

            for (let i: number = 0; i < 10; i++) {
                const regex1: RegExp = new RegExp(faNumber[i], 'g');
                const regex2: RegExp = new RegExp(arNumber[i], 'g');
                val = val.toString().replace(regex1, enNumber[i]);
                val = val.toString().replace(regex2, enNumber[i]);
            }

            return val;
        }
    }
}

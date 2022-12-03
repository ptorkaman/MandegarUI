import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeService } from '../../@core/services/datetime.service';

@Pipe({ name: 'dateTimeFormat' })
export class DateTimeFormatPipe implements PipeTransform {

    constructor(private dateTimeService: DateTimeService) { }

    transform(value: string, ...args: string[]): string {
        if (typeof value === 'undefined' || value === null || value === '' || value.charAt(0) === '9') {
            return '';
        } else {
            const type: string = args[0];
            const calendar: string = args[1];
            const format: string = args[2];

            if (type === 'date') {
                if (calendar === 'fa') {

                    return this.dateTimeService.toPersian(value, format);
                } else if (calendar === 'en') {
                    return this.dateTimeService.toGregorian(value, format);
                }
            } else if (type === 'time') {
                return this.dateTimeService.time(value, calendar);
            }
        }
    }
}

import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as momentFa from 'moment-jalaali';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

export enum MeasureType {
    Years = 'years',
    Quarters = 'quarters',
    Months = 'months',
    Weeks = 'weeks',
    Days = 'days',
    Hours = 'hours',
    Minutes = 'minutes',
    Seconds = 'seconds',
    Millisecond = 'millisecond'
}

export enum DateFormat {
    Date = 'YYYY-MM-DD',
    PersianDate = 'jYYYY/jMM/jDD',
    Time = 'hh:mm:ss',
    DateTime = 'YYYY-MM-DD HH:mm:ss'
}

@Injectable({ providedIn: 'root' })
export class DateTimeService extends BaseService {

    private serverOffset: number = 0;

    constructor() {
        super();

        // this.syncServer().subscribe(offset => { this.serverOffset = offset; });
    }

    public getDate(format: string = DateFormat.Date): string {
        return this.getDateTime(null, format);
    }

    public getPersianDate(format: string = DateFormat.PersianDate): string {
        return this.toPersian(this.getDateTime(null), format);
    }

    public getTime(format: string = DateFormat.Time): string {
        return this.getDateTime(null, format);
    }

    public getDateTime(date: Date | string = null, format: string = DateFormat.DateTime): string {
        if (date === null) {
            date = this.getServerDateTime();
        }

        return moment(date).format(format);
    }

    public getServerDateTime(format: string = DateFormat.DateTime): string {
        return moment().add(this.serverOffset, MeasureType.Millisecond).format(format);
    }

    public toPersian(date: Date | string, format: string = DateFormat.PersianDate): string {
        momentFa.loadPersian({ dialect: 'persian-modern' });

        const m: any = momentFa(date, DateFormat.DateTime);
        if (m.isValid()) {
            return m.format(format);
        } else {
            return null;
        }
    }

    public toGregorian(date: string, format: string = DateFormat.Date): string {
        const m: any = momentFa(date, DateFormat.PersianDate);
        if (m.isValid()) {
            return m.format(format);
        } else {
            return null;
        }
    }

    public time(time: string, format: string = DateFormat.Time): string {
        return moment(time).format(format);
    }

    public parseDate(date: Date | string, format: string = DateFormat.Date): string {
        return this.getDateTime(date, format);
    }

    public dateDiff(date1: Date | string, date2: Date | string, measure: MeasureType, format: string = DateFormat.Date): number {
        const dt1: any = moment(date1, format);
        const dt2: any = moment(date2, format);

        return dt1.diff(dt2, measure);
    }

    public dateAdd(date: Date | string, value: number, measure: MeasureType, format: string = DateFormat.Date): string {
        return moment(date).add(value, measure).format(format);
    }

    public dateSubtract(date: Date | string, value: number, measure: MeasureType, format: string = DateFormat.Date): string {
        return moment(date).subtract(value, measure).format(format);
    }

    public dateIsValid(date: string): boolean {
        return moment(date).isValid();
    }

    public dateToNumber(date: string): number {
        return moment(date, DateFormat.Date).unix();
    }

    public numberToDate(num: number, format: string = DateFormat.Time): string {
        return moment.unix(num).format(format);
    }

    public secondsToTime(seconds: number, format: string = DateFormat.Time): any {
        return moment.duration(seconds, 'seconds').minutes() + ':' + moment.duration(seconds, 'seconds').seconds();
    }

    public isLeapYear(year: number, format: string = DateFormat.Date): boolean {
        return momentFa(year, format).isLeapYear();
    }

    private syncServer(): Observable<number> {
        return new Observable<any>(observer => {
            super.get<Date>('Api/Authentication/GetCurrentDate', 'json').subscribe(
                serverDate => {
                    const offset: number = moment(serverDate).diff(new Date());

                    observer.next(offset);
                }
            );
        });
    }
}

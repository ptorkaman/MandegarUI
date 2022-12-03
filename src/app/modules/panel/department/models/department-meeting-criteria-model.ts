import { Time } from "@angular/common";
import { prop } from "@rxweb/reactive-form-validators";

export class DepartmentMeetingCriteriaModel {
  @prop()
  name?: string;

  @prop()
  meetingDate?: Date;

  @prop()
  time?:string;

  @prop()
  meetingTime?: Time;

  @prop()
  departmentScheduleId?: number;

  pageIndex: number;
  pageCount: number;
  orderBy: string;
  orderAsc: boolean;
}

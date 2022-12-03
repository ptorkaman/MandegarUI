import { Time } from "@angular/common";
import { prop, required } from "@rxweb/reactive-form-validators";

export class ProceedingDepartmentCriteriaModel {
  @prop()
  departmentMeetingId?: number;

  @prop()
  startDate?: Date;

  @prop()
  endDate?: Date;

  @prop()
  programs?: string;

  @prop()
  comments?: string;

  @prop()
  description?: string;

  @prop()
  time?: string;

  @prop()
  startTime?: any;

  @prop()
  endTime?: any;

  pageIndex: number;
  pageCount: number;
  orderBy: string;
  orderAsc: boolean;
}

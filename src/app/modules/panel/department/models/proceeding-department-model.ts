
import { Time } from "@angular/common";
import { prop, required } from "@rxweb/reactive-form-validators";

export class ProceedingDepartmentModel {
  id?: number;

  @prop()
  @required()
  departmentMeetingId?: number;

  @prop()
  @required()
  startDate?: Date;

  @prop()
  @required()
  endDate?: Date;

  @prop()

  programs?: string;

  @prop()
  comments?: string;

  departmentMeetingTitle?: string;

  @prop()
  description?: string;

  @prop()
  @required()
  startTime?: any;

  @prop()
  @required()
  endTime?: any;

  persianStartDate?: string;
  persianEndDate?: string;
  proceedingStartTime?:string;
  proceedingEndTime?:string;
}

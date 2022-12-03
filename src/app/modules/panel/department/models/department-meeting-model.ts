import { Time } from "@angular/common";
import { prop, required } from "@rxweb/reactive-form-validators";

export class DepartmentMeetingModel {
  id?:number;

  @prop()
  @required()
  departmentScheduleId?:number;

  @prop()
  @required()
  name?:string;

  @prop()
  @required()
  meetingDate?:Date;

  @prop()
  @required()
  meetingTime?:Time;

  persianDate?:string;
  departmentScheduleName?:string;
  time?:string;
}

import { prop, required } from "@rxweb/reactive-form-validators";

export class DepartmentScheduleModel {
  @prop()
  @required()
  name: string;


  id: any;
  @prop()
  fromDate?:string;
  @prop()
  toDate?:string;

  @prop()
  @required()

 executiveCalendarId:number;
  @prop()
  timeLimit:string;
  @prop()
  executiveCalendarName:string;


}

import { prop, required } from "@rxweb/reactive-form-validators";

export class ExecutiveCalendarModel {
  @prop()
  @required()
  name: string;

  @prop()
  id: any;
  @prop()
  @required()
  academicYearId:number;
  @prop()
  ParentName:string;
  @prop()
  academicYearName:string;
}

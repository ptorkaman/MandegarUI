
import { email, prop } from "@rxweb/reactive-form-validators";

export class DepartmentScheduleCriteriaModel {
  @prop()
  name: string;
  @prop()
  fromDate:string=null;
  @prop()
  toDate?:string;

  @prop()
 executiveCalendarId?:number;
  @prop()
  timeLimit:string;
  @prop()
  executiveCalendarName:string;

  pageIndex: number;
  pageCount: number;
  orderBy: string;
  orderAsc: boolean;
}

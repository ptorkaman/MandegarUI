import { prop, required } from "@rxweb/reactive-form-validators";

export class AcademicYearModel {
  @prop()
  @required()
  name: string;


  id: any;
  @prop()
  @required()
  fromDate:string;
  @prop()
  @required()
  toDate:string;
}

import { prop, required } from "@rxweb/reactive-form-validators";

export class DepartmentActivityModel {
  @prop()
  @required()
  name: string;

  @prop()
  id: any;

  @prop()
  @required()
  departmentId: number;
  @prop()
  attachmentFile:string;
  @prop()
  description:string;
   @prop()
   activityDescription:string;
}

import { prop, required } from "@rxweb/reactive-form-validators";

export class DepartmentActivityModel {
  @prop()
  @required()
  name: string;

  @prop()
  id: any;

  @prop()
  taskGroupId: number;
  @prop()
  attachmentFile:string;
}

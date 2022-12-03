import { prop, required } from "@rxweb/reactive-form-validators";

export class DepartmentModel {
  @prop()
  @required()
  name: string;
  @prop()
  parentId:any;
  id: any;
  @prop()
  ParentName:string;
}

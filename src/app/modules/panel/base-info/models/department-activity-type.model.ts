import { prop, required } from "@rxweb/reactive-form-validators";

export class DepartmentActivityTypeModel {
  @prop()
  @required()
  name: string;


  id: any;

}

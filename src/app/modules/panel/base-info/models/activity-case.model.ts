import { prop, required } from "@rxweb/reactive-form-validators";

export class ActivityCaseModel {
  @prop()
  @required()
  name: string;


  id: any;

}

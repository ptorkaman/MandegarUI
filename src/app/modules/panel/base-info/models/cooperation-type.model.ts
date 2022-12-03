import { prop, required } from "@rxweb/reactive-form-validators";

export class CooperationTypeModel {
  @prop()
  @required()
  name: string;


  id: any;

}

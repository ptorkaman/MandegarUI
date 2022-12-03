import { prop, required } from "@rxweb/reactive-form-validators";

export class TaskGroupModel {
  @prop()
  @required()
  name: string;


  id: any;

}

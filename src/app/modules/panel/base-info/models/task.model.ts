import { prop, required } from "@rxweb/reactive-form-validators";

export class TaskModel {
  @prop()
  @required()
  name: string;

  @prop()
  id: any;

  @prop()
  @required()
  taskGroupId: number;
}

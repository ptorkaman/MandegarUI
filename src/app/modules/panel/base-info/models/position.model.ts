import { prop, required } from "@rxweb/reactive-form-validators";

export class PositionModel {
  @prop()
  @required()
  name: string;

  @prop()
  id: any;
  @prop()
  parentId?:any;
  @prop()
  ParentName:string;
  positionId?:any;

}

import { prop, required } from "@rxweb/reactive-form-validators";
import { RootModel } from "../../account/models/RootModel";
import { PositionModel } from "./position.model";

export class AssignTaskModel {


  @prop()
  id: any;

  @prop()

  taskId: number;
  @prop()
  @required()
  positionId:number;
   @prop()
  taskName:string;
  @prop()
  positionName:string;
  tasks?: any[];
  root : RootModel;
  Positio: PositionModel[];
  @prop()
  taskGroupId:number;
  @prop()
  selectTaskList=[];

}

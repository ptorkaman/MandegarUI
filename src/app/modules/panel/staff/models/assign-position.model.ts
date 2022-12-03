import { prop, required } from "@rxweb/reactive-form-validators";
import { RootModel } from "../../account/models/RootModel";
import { PositionModel } from "../../base-info/models/position.model";

export class AssignPositionModel {


  @prop()
  id: any;

  @prop()
  @required()
  staffId: number;
  @prop()
 // @required()
  positionId:number;
   @prop()
   stuffName:string;
  @prop()
  positionName:string;
  positions?: any[];
  root : RootModel;
  Positio: PositionModel[];
}

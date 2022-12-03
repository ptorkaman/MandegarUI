import { prop, required } from "@rxweb/reactive-form-validators";
import { RootModel } from "../../account/models/RootModel";
import { PositionModel } from "../../base-info/models/position.model";

export class StaffModel {
  @prop()
  @required()
  name: string;


  id: any;
  @prop()
  fullName: string;

  positions?: any[];
  root : RootModel;
  Positio: PositionModel[];
  staff: StaffModel;
  assignPositions: any[]=[];
}

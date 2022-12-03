import { prop, required } from "@rxweb/reactive-form-validators";

export class DepartmentMemberModel {


  @prop()
  id: any;

  @prop()
  @required()
  departmentId: number;
  @prop()
  @required()
  staffId:string;
  @prop()
  @required()
  positionId:string;
   @prop()
  staffName:string;
  @prop()
  positionName:string;
  @prop()
  departmentName:string;
}

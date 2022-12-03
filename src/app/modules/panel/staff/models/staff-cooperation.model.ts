import { prop, required } from "@rxweb/reactive-form-validators";

export class StaffCooperationModel {
  @prop()
  staffId: number;

  @prop()
  @required()
  cooperationTypeId: number;

  @prop()
  @required()
  departmentId: number;

  @prop()
  cooperationStartDate?: string;

  @prop()
  cooperationEndDate?: string;

  @prop()
  isActive:boolean;
}

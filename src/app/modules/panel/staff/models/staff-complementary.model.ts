import { prop, required } from "@rxweb/reactive-form-validators";

export class StaffComplementaryModel {
  @prop()
  @required()
  staffId: number;

  @prop()
  certificateNumber?: string;

  @prop()
  @required()
  religionId?: number;

  @prop()
  nationalityId?: number;

  @prop()
  bloodTypeId?: number;

  @prop()
  identitySerialNumber?: string;

  @prop()
  @required()
  maritalStatusId?: number;

  @prop()
  @required()
  militaryServiceStatusId?: number;

  @prop()
  militaryServiceDate?: string;

  @prop()
  @required()
  insuranceTypeId?: number;

  @prop()
  @required()
  insuranceNumber?: string;
}

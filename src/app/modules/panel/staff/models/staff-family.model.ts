import { compose, email, prop, required } from "@rxweb/reactive-form-validators";
import { NationalCodeValidator } from "../../../../../app/@core/form.custom.validators";

export class StaffFamilyInformationModel {
  @prop()
  id: number;
  @prop()
  @required()
  staffId: number;

  @prop()
  @required()
  name: string;

  @prop()
  @required()
  family: string;

  @prop()
  identityNumber: string;

  @prop()
  @required()
  @compose({ validators: [NationalCodeValidator()] })
  nationalCode: string;

  @prop()
  birthDate?: string;

  @prop()
  @required()
  relationId: number;

  @prop()
  educationId?: number;

  @prop()
  studyField: string;

  @prop()
  maritalStatusId?: number;

  @prop()
  job: string;

  @prop()
  @required()
  phone: string;

  @prop()
  @required()
  mobile: string;

  @prop()
  workAddress: string;

  @prop()
  workPhone: string;

  @prop()
  @email()
  email: string;

  @prop()
  description: string;

  relationName: string;
}

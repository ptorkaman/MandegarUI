import { compose, prop, required } from "@rxweb/reactive-form-validators";
import { NationalCodeValidator } from "../../../../../app/@core/form.custom.validators";

export class UpsertStaffModel {
  @prop()
  id?:number;

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
  birthCityId: number | null;

  @prop()
  identityIssueCityId: number | null;

  @prop()
  identitySerialNumber: string;

  @prop()
  @required()
  birthDate: string;

  @prop()
  identityIssueDate: string;

  @prop()
  personneliCode: string;

  @prop()
  image: string;

  @prop()
  gender: boolean;

  @prop()
  isActive: boolean;

  @prop()
  @required()
  fatherName:string;
}

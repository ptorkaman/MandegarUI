import { email, prop, required } from "@rxweb/reactive-form-validators";

export class StaffAddressModel {
  @prop()
  staffId?: number;

  @prop()
  @required()
  phone: string;

  @prop()
  @required()
  mobile1?: string;

  @prop()
  mobile2?: string;

  @prop()
  @required()
  address?: string;

  @prop()
  addressTypeId?: number;

  @prop()
  otherWorkName?: string;

  @prop()
  otherWorkPhone: string;

  @prop()
  description?: string;

  @prop()
  @email()
  @required()
  email?: string;
}

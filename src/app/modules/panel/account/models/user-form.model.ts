import { compose, disable, email, prop, required } from "@rxweb/reactive-form-validators";
import { NationalCodeValidator } from "../../../../@core/form.custom.validators";

export class UserFormModel {
  @prop()
  id?: number;

  @prop()
  @required()
  username: string;

  @prop()
  @required({ conditionalExpression: function () { return this.id == 0 || this.id == null || typeof this.id == 'undefined' } })
  password: string;

  @prop()
  name?: string;

  @prop()
  family?: string;

  @prop()
  mobile?: string;

  @prop()
  @email()
  @required()
  email: string;

  @compose({ validators: [NationalCodeValidator()] })
  @prop()
  nationalCode?: string;

  @prop()
  birthDate?: string;

  @prop()
  @required()
  gender: boolean;

  @prop()
  @required()
  isActive: boolean;

  @prop()
  userAvatar?: string;

  @prop()
  roles?: any;

  user: any;
  profile: any;
}

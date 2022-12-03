import { compare, prop, required } from "@rxweb/reactive-form-validators";

export class ChangePasswordModel {
  @prop()
  @required()
  currentPassword: string;

  @prop()
  @required()
  newPassword: string;

  @prop()
  @required()
  @compare({ fieldName: 'newPassword', message: 'رمز عبور و تکرار آن یکسان نیست' })
  repeatNewPassword: string;
}

import { compare, email, prop, required } from '@rxweb/reactive-form-validators';
export class ResetPasswordModel {
  @prop()
  @required()
  requestCode: string;

  @prop()
  @required()
  password: string;

  @prop()
  @required()
  @compare({ fieldName: 'password', message:'رمز عبور با تکرار آن یکسان نیست' })
  rePassword: string;

  @prop()
  @required()
  captcha: string;

  @prop()
  key: string;
}

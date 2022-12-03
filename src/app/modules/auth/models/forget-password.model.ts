import { email, prop, required } from '@rxweb/reactive-form-validators';
export class ForgetPasswordModel {
  @prop()
  @required()
  @email()
  email: string;

  @prop()
  @required()
  captcha: string;

  @prop()
  key: string;
}

import { prop, required } from "@rxweb/reactive-form-validators";

export class LoginModel {
  @prop()
  @required()
  username: string;

  @prop()
  @required()
  password: string;

  @prop()
  @required()
  captcha: string;

  @prop()
  key: string;
}

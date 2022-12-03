import { email, prop } from "@rxweb/reactive-form-validators";

export class UsersCriteriaModel {
  @prop()
  name?: string;

  @prop()
  family?: string;

  @prop()
  @email()
  email?: string;

  @prop()
  username?: string;

  pageIndex: number;
  pageCount: number;
  orderBy: string;
  orderAsc: boolean;
}

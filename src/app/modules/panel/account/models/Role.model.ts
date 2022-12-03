import { prop, required } from "@rxweb/reactive-form-validators";

export class RoleModel {
  @prop()
  @required()
  name: string;

  showInList?: string;
  rolePermissions?: any[];
  id: any;

}

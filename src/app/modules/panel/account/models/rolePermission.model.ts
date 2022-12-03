import { TreeNode } from "primeng/api";
import { PermissionModel } from "./permission.model";
import { RoleModel } from "./role.model";
import { RootModel } from "./RootModel";

export interface RolePermissionModel {
  role: RoleModel;
  permissions: PermissionModel[];
  root : RootModel;
}

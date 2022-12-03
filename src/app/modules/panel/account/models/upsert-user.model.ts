import { ProfileModel } from "./profile.model";
import { RoleModel } from "./Role.model";
import { UserModel } from "./user.model";

export interface UpsertUserModel {
  user: UserModel;
  profile: ProfileModel;
  roles?: RoleModel[];
  userAvatar: string;
}

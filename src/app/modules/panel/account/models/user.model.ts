export interface UserModel {
  id?: number;
  username?: string;
  password?: string;
  isActive: boolean;
  requestCode?:string;
}

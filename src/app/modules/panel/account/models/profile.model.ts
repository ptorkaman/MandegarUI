export interface ProfileModel {
  id?: number;
  name?: string;
  family?: string;
  email?: string;
  mobile?: string;
  birthDate?: string | null;
  nationalCode?: string;
  avatar?: string;
  gender: boolean;
  lastLogin?: string;
  userId?: number;
}

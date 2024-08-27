export interface UserModel {
  id: Buffer;
  name: string;
  email: string;
  isActive: boolean;
}
export interface LoginInterface {
  email: string;
  password: string;
}
export interface RecoveryPasswordInterface {
  email: string;
  password: string;
  codeEmail: string | null;
}

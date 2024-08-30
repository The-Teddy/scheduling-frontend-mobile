export interface UserInterface {
  id: Buffer;
  name: string;
  email: string;
  logo: string;
  cover: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

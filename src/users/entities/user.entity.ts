export enum UserStatus {
  Active = 'Active',
  Pending = 'Pending',
  Inactive = 'Inactive',
}

export class Users {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  location: string;
  status: string;
  confirmationToken: number;
  roleID: number;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

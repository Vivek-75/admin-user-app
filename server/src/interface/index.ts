export interface BaseSchema {
  _id: string;
  __v: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAdmin extends BaseSchema{
  name?: string,
  email: string,
  password: string,
  isAdmin?: boolean,
}

export interface IUser extends IAdmin{
  pending?: boolean,
  disabled?: boolean,
  adminId?: string,
}

export interface IPendingUser extends BaseSchema{
  name: string,
  email: string,
  adminId?: string
}

export interface IInvitedUser {
  name: string
  email: string
  adminId: string
}

export interface IChat extends BaseSchema {
  from: string,
  to: string,
  message: string
}
export interface BaseSchema {
  _id: string;
  __v: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUser extends IAdmin{
  // name?: string,
  // email: string,
  // password: string,
  pending?: boolean,
  disabled?: boolean,
  adminId?: string,
  // isAdmin?: boolean,
}

export interface IAdmin extends BaseSchema{
  name?: string,
  email: string,
  password: string,
  isAdmin?: boolean,
}

export interface IPendingUser {
  _id?: string,
  name: string,
  email: string,
  adminId?: string
  __v?: number,
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
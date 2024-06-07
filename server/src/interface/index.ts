
export interface IUser {
  _id?: string,
  name?: string,
  email: string,
  password: string,
  disabled?: boolean,
  adminId?: string,
  isAdmin?: boolean,
  __v?: number,
}

export interface IAdmin {
  _id?: string,
  name?: string,
  email: string,
  password: string,
  isAdmin?: boolean,
  __v?: number,
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

export interface IChat {
  _id?: string,
  __v?: number,
  senderId: string,
  receiverId: string,
  message: string,
  createdAt: string,
  updatedAt: string,
}
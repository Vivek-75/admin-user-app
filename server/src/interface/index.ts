
export interface IUser {
  _id?: string,
  name?: string,
  email: string,
  password: string,
  isAdmin?: boolean,
  disabled?: boolean,
  __v?: number,
}

export interface IPost {
  userId: string,
  title: string,
  body: string,
}

export interface IInvitedUser {
  name: string
  email: string
}
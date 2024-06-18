import { Dispatch, SetStateAction } from 'react';


export interface User {
  name: string,
  password?: string,
}

export interface IUser {
  _id? : string;
  name? : string;
  email : string;
  password? : string;
  isAdmin?: boolean;
  adminId?: string;
  pending?: boolean;
  disabled?: boolean;
  __v?: number;
}

export interface IUserWidget {
  _id: string,
  name: string,
  email: string,
  disabled?: boolean,
  // reload?: boolean,
  setReload?: Dispatch<SetStateAction<boolean>>
}


export interface IRows {
  id: string;
  name: string;
  email: string;
  status: string;
  disabled: string;
}
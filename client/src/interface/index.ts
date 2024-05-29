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
  disabled?: boolean;
  __v?: number;
}

export interface IUserWidget {
  _id: string,
  name: string,
  email: string,
  disabled: boolean,
  setReload: Dispatch<SetStateAction<boolean>>
}
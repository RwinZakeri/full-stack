import { Dispatch, SetStateAction } from "react";

export enum AuthType {
  login = 1,
  register = 2,
}

export type AuthFormProps = {
  setPosition: Dispatch<SetStateAction<AuthType>>; // Correctly typing setPosition
};

export enum ButtonTypeGlobal {
  button = 1,
  reset = 2,
  submit = 3,
}

export interface RegisterReduderType {
  userName: string;
  email: string;
  password: string;
  repassword: string;
}

export type LoginReducerType = {
  userName: string;
  password: string;
};

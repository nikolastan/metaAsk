import { Action } from "@ngrx/store";
import { User } from "../models/user.model";

export const LOG_IN = "[AUTH] Log_in";
export const LOG_IN_SUCCESS = "[AUTH] Log_in_success";
export const REGISTER = "[AUTH] Register";
export const LOG_OUT = "[AUTH] Log_out";

export class LogIn implements Action {
  readonly type = LOG_IN;

  constructor(public payload: { username; password }) {}
}

export class LogInSuccess implements Action {
  readonly type = LOG_IN_SUCCESS;

  constructor(public payload: User) {}
}

export type AuthActions = LogIn | LogInSuccess;

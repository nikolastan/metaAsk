import { Action } from "@ngrx/store";
import { User } from "../models/user.model";

export const LOG_IN = "[AUTH] Log_in";
export const LOG_IN_SUCCESS = "[AUTH] Log_in_success";
export const LOG_IN_FAILURE = "[AUTH] Log_in_failure";
export const REGISTER = "[AUTH] Register";
export const LOG_OUT = "[AUTH] Log_out";
export const SIGN_UP = "[AUTH] Sign_up";
export const SIGN_UP_SUCCESS = "[AUTH] Sign_up_success";
export const SIGN_UP_FAILURE = "[AUTH] Sign_up_failure";

export class LogIn implements Action {
  readonly type = LOG_IN;

  constructor(public payload: { email; password }) {}
}

export class LogInSuccess implements Action {
  readonly type = LOG_IN_SUCCESS;

  constructor(public payload: { token; email }) {}
}

export class LogInFailure implements Action {
  readonly type = LOG_IN_FAILURE;

  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = SIGN_UP;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  readonly type = SIGN_UP_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
  readonly type = SIGN_UP_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = LOG_OUT;
}

export type AuthActions =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogOut;

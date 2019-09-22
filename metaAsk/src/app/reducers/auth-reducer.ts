import { createEntityAdapter, EntityState, EntityAdapter } from "@ngrx/entity";
import { AppState } from "../app.state";
import { User } from "../models/user.model";
import { initialState } from "./index";
import * as AuthActions from "../actions/authActions";

export interface AuthState {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
}

export const authInitialState: AuthState = {
  isAuthenticated: false,
  user: null
};

export function AuthReducer(
  state: AuthState = authInitialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOG_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: new User(
          action.payload.id,
          action.payload.username,
          action.payload.password
        )
      };
  }
}

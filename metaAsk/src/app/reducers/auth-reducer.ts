import { AppState } from "../app.state";
import { User } from "../models/user.model";
import * as AuthActions from "../actions/authActions";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string;
}

export const authInitialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function AuthReducer(
  state: AuthState = authInitialState,
  action: AuthActions.AuthActions
): AuthState {
  switch (action.type) {
    case AuthActions.LOG_IN_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        user: {
          accessToken: action.payload.token,
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    case AuthActions.LOG_IN_FAILURE:
      return {
        ...state,
        errorMessage: "Incorrect username or password."
      };
    case AuthActions.SIGN_UP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          accessToken: action.payload.accessToken,
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    case AuthActions.SIGN_UP_FAILURE: {
      return {
        ...state,
        errorMessage: "That email is already in use."
      };
    }
    case AuthActions.LOG_OUT: {
      return authInitialState;
    }
    default: {
      return state;
    }
  }
}

export const selectAuthState = (state: AppState) => state.auth;

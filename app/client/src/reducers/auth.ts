import * as enums from "../enums";
import IUser from "../models/user";
import { Types, AuthAction } from "../actions/auth";

/**
 * Auth state
 */
export interface Auth {
  user?: IUser;
  token?: string;
  error?: string;
  status: enums.AuthStatus;
}

/**
 * initial auth state
 */
const initialState: Auth = {
  user: undefined,
  token: undefined,
  error: undefined,
  status: enums.AuthStatus.none,
};

export default (state: Auth = initialState, action: AuthAction): Auth => {
  const { payload } = action;
  switch (action.type) {
    case Types.LOGIN_INITIATED: {
      return {
        ...state,
        status: enums.AuthStatus.initiated,
      };
    }
    case Types.LOGIN_SUCCESS: {
      return {
        ...state,
        error: undefined,
        user: payload.user,
        token: payload.token,
        status: enums.AuthStatus.success,
      };
    }
    case Types.LOGIN_FAILED: {
      return {
        ...state,
        error: payload.error,
        status: enums.AuthStatus.failed,
      };
    }
    case Types.LOGOUT: {
      return {
        ...state,
        error: initialState.error,
        user: initialState.user,
        token: initialState.token,
        status: enums.AuthStatus.none,
      };
    }
    default:
      return state;
  }
};

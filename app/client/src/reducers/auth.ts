import IUser from "../models/user";
import { Types, AuthAction } from "../actions/auth";

/**
 * Auth state
 */
export interface Auth {
  user?: IUser;
  token?: string;
  error?: string;
  isAuthenticated: boolean;
}

/**
 * initial auth state
 */
const initialState: Auth = {
  user: undefined,
  token: undefined,
  error: undefined,
  isAuthenticated: false,
};

export default (state: Auth = initialState, action: AuthAction): Auth => {
  const { payload } = action;
  switch (action.type) {
    case Types.LOGIN_SUCCESS: {
      return {
        ...state,
        error: undefined,
        user: payload.user,
        token: payload.token,
        isAuthenticated: true,
      };
    }
    case Types.LOGIN_FAILED: {
      return {
        ...state,
        error: payload.error,
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
};

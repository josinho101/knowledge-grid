import IUser from "../models/user";
import { Types, AuthAction } from "../actions/auth";

/**
 * Auth state
 */
export interface AuthState {
  user?: IUser;
  token?: string;
  error?: string;
  isAuthenticated: boolean;
}

/**
 * initial auth state
 */
const initialState: AuthState = {
  user: undefined,
  token: undefined,
  error: undefined,
  isAuthenticated: false,
};

export default (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
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

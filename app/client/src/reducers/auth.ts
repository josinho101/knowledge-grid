import IUser from "../models/user";
import { Types, AuthAction } from "../actions/auth";

/**
 * Auth state
 */
export interface AuthState {
  user: IUser;
  token: string;
  isAuthenticated: boolean;
}

/**
 * initial auth state
 */
const initialState: AuthState = {
  user: undefined!,
  token: undefined!,
  isAuthenticated: false,
};

export default (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case Types.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case Types.LOGIN_FAILED: {
      return {
        ...state,
        isAuthenticated: false,
        user: undefined!,
        token: undefined!,
      };
    }
    default:
      return state;
  }
};

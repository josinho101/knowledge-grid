import * as enums from "../enums";
import IUser from "../models/user";
import * as constants from "../constants";
import * as settings from "../appsettings.json";
import StorageHelper from "../utils/storagehelper";
import { Types, AuthAction } from "../actions/auth";

/**
 * Auth state
 */
export interface Auth {
  user?: IUser;
  token?: string;
  error?: string;
  status: enums.AuthStatus;
  doRetryAuth?: boolean;
  retryCount?: number;
}

const auth = StorageHelper.get(constants.Keys.AUTH);

/**
 * initial auth state
 */
const initialState: Auth = {
  user: auth ? JSON.parse(auth).user : undefined!,
  token: auth ? JSON.parse(auth).token : undefined,
  doRetryAuth: auth !== null, // retry authentication if token loaded from storage
  retryCount: 0,
  status: enums.AuthStatus.none,
  error: undefined,
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
      let auth = {
        user: payload.user,
        token: payload.token,
      };
      StorageHelper.set(constants.Keys.AUTH, JSON.stringify(auth));
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
      StorageHelper.remove(constants.Keys.AUTH);
      return {
        ...state,
        error: initialState.error,
        user: initialState.user,
        token: initialState.token,
        status: enums.AuthStatus.none,
      };
    }
    case Types.RETRY_AUTH: {
      const retryCount = action.payload.retryCount || 0;

      if (retryCount > settings.authRetryCount) {
        StorageHelper.remove(constants.Keys.AUTH);
      }

      return {
        ...state,
        doRetryAuth: action.payload.doRetryAuth,
        retryCount: retryCount,
        status: action.payload.status,
      };
    }
    default:
      return state;
  }
};

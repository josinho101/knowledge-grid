import urls from "../urls";
import Base from "../base";
import config from "config";
import { Dispatch } from "react";
import { AuthState } from "../../reducers/auth";
import RequestHandler from "../../utils/requesthandler";

/**
 * Enum for the different auth actions
 */
export enum Types {
  LOGIN_INITIATED = "LOGIN_INITIATED",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILED = "LOGIN_FAILED",
}

/* Auth action */
export interface AuthAction extends Base {
  type: Types;
  payload: AuthState;
}

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: Types.LOGIN_INITIATED,
      payload: undefined!,
    });

    const url = config.get("baseUrl") + urls.LOGIN;
    const response = await RequestHandler.post(url, {
      email: email,
      password: password,
    });

    if (response !== null) {
      dispatch({
        type: Types.LOGIN_SUCCESS,
        payload: undefined!,
      });
    } else {
      dispatch({
        type: Types.LOGIN_FAILED,
        payload: undefined!,
      });
    }
  };
};

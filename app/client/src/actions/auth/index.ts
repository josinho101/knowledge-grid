import Base from "../base";
import * as urls from "../urls";
import { Dispatch } from "react";
import { AuthState } from "../../reducers/auth";
import * as settings from "../../appsettings.json";
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

    const url = settings.baseUrl + urls.LOGIN;
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
